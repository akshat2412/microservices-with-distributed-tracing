import { app } from './src/app'

const port = process.env.ORDER_MICROSERVICE_PORT;

// start the Express server
app.listen( port, () => {
    console.log( `order microservice started at http://localhost:${ port }` );
} );