import * as express from 'express'; 

export interface Route {
    type: string;
    path: string;
    handlers: express.RequestHandler[]
}