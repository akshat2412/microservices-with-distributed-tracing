import express from "express";
import { Tags, FORMAT_HTTP_HEADERS, Span, REFERENCE_CHILD_OF } from 'opentracing';
import { OrderDbContext } from "../Data";
import { Tracer } from '../../tracer';

export class OrderController {
    private _orderDbContext: OrderDbContext

    constructor() {     
        this._orderDbContext = new OrderDbContext();   
    }

    public getOrder = async (req: express.Request, res: express.Response) => {
        let orderId: string = req.params['orderId'];
        let order = await this._orderDbContext.getOrder(orderId);

        if(order) {
            return res.status(200).json(order);
        }
    }

    public getUserOrders = async (req: express.Request, res: express.Response) => {
        const tracer = new Tracer('order-microservice');
        const span: Span = tracer.createControllerSpan('OrderController', 'getUserOrders', req.headers, FORMAT_HTTP_HEADERS);
        
        let username: string = req.params['username'];

        const dataSpan: Span = tracer.createControllerSpan('OrderController', 'getUserOrders DB', span);
        let orderList = await this._orderDbContext.getUserOrders(username);
        
        if(orderList.length > 0) {
            tracer.closeSpanWithStatus(dataSpan, 200);
            tracer.closeSpanWithStatus(span, 200);
            return res.status(200).json({
                orders: orderList
            })
        }
    }
}