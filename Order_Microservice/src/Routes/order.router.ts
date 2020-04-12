import express from "express";
import { Route } from "./route.interface";
import { OrderController } from "../Controllers";

export class OrderRouter {
    public router: express.Router = express.Router();
    private _orderController: OrderController;
    private _routes: Route[];

    constructor() {
        this._orderController = new OrderController();
        
        // Define all the routes starting with '/user' here 
        this._routes = [
            { type: 'get', path: '/:username', handlers: [this._orderController.getUserOrders]},
        ];
        this.createRoutes();
    }

    private createRoutes() {
        this._routes.forEach((route: Route) => {
            switch(route.type) {
                case('get'): {
                    this.router.get(route.path, route.handlers);
                    break;    
                }
                case('delete'): {
                    this.router.delete(route.path, route.handlers);
                    break;
                }
                case('post'): {
                    this.router.post(route.path, route.handlers);
                    break;
                }
            }
        });
    }
}

