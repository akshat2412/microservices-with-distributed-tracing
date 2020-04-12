import express from "express";
import { Route } from "./route.interface";
import { AggregateController } from "../Controllers";

export class AggregateRouter {
    public router: express.Router = express.Router();
    private _aggregateController: AggregateController;
    private _routes: Route[];

    constructor() {
        this._aggregateController = new AggregateController();
        
        // Define all the routes starting with '/user' here 
        this._routes = [
            { type: 'get', path: '/:username', handlers: [this._aggregateController.getOrderDetails]},
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

