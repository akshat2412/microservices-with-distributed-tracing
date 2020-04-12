import got from 'got';
import { Span } from 'opentracing';
import { Tracer } from '../../../tracer';

export class ApiService {

    public static getUserOrders(username: string, tracer:Tracer, span: Span): any {
        const url = `${process.env.ORDER_MICROSERVICE_URL}/order/${username}`;

        let headers = {};
        tracer.injectSpan(span, headers);
        return got(url, {headers});
    }

    public static getUser(username: string, tracer: any, span: Span): any {
        const url = `${process.env.USER_MICROSERVICE_URL}/user/${username}`;

        let headers = {};
        tracer.injectSpan(span, headers);
        return got(url, {headers});
    }
}