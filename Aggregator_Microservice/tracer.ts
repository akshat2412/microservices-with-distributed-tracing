import { FORMAT_HTTP_HEADERS, Span, Tags } from "opentracing";
const initJaegerTracer = require('jaeger-client').initTracer;

export class Tracer {
  private _serviceName: string;
  private _tracer: any;
  private _config: any
  private _tracerOptions: any;

  constructor(serviceName: string) {
    this._serviceName = serviceName;
    this.setConfig();
    this.setTracerOptions();
    this._tracer = initJaegerTracer(this._config, this._tracerOptions);
  }

  private setConfig() {
    this._config = {
      serviceName: this._serviceName,
      sampler: {
        type: "const",
        param: 1,
      },
      reporter: {
        logSpans: true,
        collectorEndpoint: process.env.TRACING_COLLECTOR_ENDPOINT
      },
    };
  }

  private setTracerOptions() {
    this._tracerOptions = {
      logger: {
        info(msg: any) {
          console.log("INFO ", msg);
        },
        error(msg: any) {
          console.log("ERROR", msg);
        },
      },
    };
  }

  public createControllerSpan(controller: string, operation: string, headers?: any) {
    let span: Span;

    if (headers) {
      const parentSpanContext = this._tracer.extract(FORMAT_HTTP_HEADERS, headers);
      span = this._tracer.startSpan(operation, {
        childOf: parentSpanContext,
        tags: {
          [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
          [Tags.COMPONENT]: controller
        }
      });
    } else {
      span = this._tracer.startSpan(operation, {
        tags: {
          [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
          [Tags.COMPONENT]: controller
        }
      });
    }

    return span;
  }

  public injectSpan(span: Span, obj: any) {
    this._tracer.inject(span, FORMAT_HTTP_HEADERS, obj);
  }

  public closeSpanWithStatus(span: Span, statusCode: number) {
    span.setTag(Tags.HTTP_STATUS_CODE, statusCode);
    span.finish();
  }

  public closeTracer() {
    this._tracer.close();
  }
}