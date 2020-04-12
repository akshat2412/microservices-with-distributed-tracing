import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { OrderRouter } from './Routes';

const app = express();
let orderRouter = new OrderRouter().router;

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('short'));
app.use('/order', orderRouter);
export { app };