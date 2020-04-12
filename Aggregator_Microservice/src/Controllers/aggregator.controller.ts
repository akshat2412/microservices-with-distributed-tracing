import express from "express";
import { Tags, FORMAT_HTTP_HEADERS, Span } from 'opentracing';
import { ApiService } from "../Shared/Services";
import { Order, User } from "../Shared/Models";
import { Tracer } from '../../tracer'

export class AggregateController {
    constructor() { }   
    
    public getOrderDetails = async (req: express.Request, res: express.Response) => {
        const tracer = new Tracer('aggregator-microservice');
        const span:Span = tracer.createControllerSpan('AggregateController', 'getOrderDetails');

        let username: string = req.params['username'];
        let orders: Order[];
        let user: User;
        
        return ApiService.getUser(username, tracer, span)
            .then((userData: any) => {
                user = JSON.parse(userData.body) as User;
                return;
            })
            .then(() => {
                return ApiService.getUserOrders(username, tracer, span);
            })
            .then((orderData: any) => {
                tracer.closeSpanWithStatus(span, 200);
                tracer.closeTracer();
                
                orders = JSON.parse(orderData.body).orders as Order[];
                return res.status(200).json({
                    user: user,
                    orders: orders
                });
            })
    }
}