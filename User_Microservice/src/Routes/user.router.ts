import express from "express";
import { Route } from "./route.interface";
import { UserController } from "../Controllers";

export class UserRouter {
    public router: express.Router = express.Router();
    private _userController: UserController;
    private _routes: Route[];

    constructor() {
        this._userController = new UserController();
        
        // Define all the routes starting with '/user' here 
        this._routes = [
            { type: 'get', path: '/:userName', handlers: [this._userController.GetUser]},
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

