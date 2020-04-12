import express from "express";
import { Tags, FORMAT_HTTP_HEADERS, Span } from 'opentracing';
import { UserDbContext } from "../Data"
import { UserApiResponse } from "../Shared/Models";
import { Tracer } from '../../tracer';

export class UserController {
    private _userDbContext: UserDbContext

    constructor() {     
        this._userDbContext = new UserDbContext();   
    }

    public GetUser = async (req: express.Request, res: express.Response) => {
        const tracer = new Tracer('user-microservice');
        const span: Span = tracer.createControllerSpan('UserController', 'getUser', req.headers, FORMAT_HTTP_HEADERS);
        
        let userName: string = req.params['userName']

        const dataSpan: Span = tracer.createControllerSpan('UserController', 'getUser DB', span); 
        let user = await this._userDbContext.GetUser(userName);
        tracer.closeSpanWithStatus(dataSpan, 200);

        tracer.closeSpanWithStatus(span, 200);
        if(user) {
            // let userApiResponse = user as UserApiResponse;
            return res.status(200).json(user);
        }
    }
}