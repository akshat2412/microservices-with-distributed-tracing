import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { UserRouter } from './Routes';

const app = express();
let userRouter = new UserRouter().router;

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('short'));
app.use('/user', userRouter);
export { app };