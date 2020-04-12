import { app } from './src/app'
import {logger} from './logger'

const port = process.env.AGGREGATOR_MICROSERVICE_PORT;

// start the Express server
app.listen( port, () => {
    console.log( `aggregator microservice started at http://localhost:${ port }` );
    logger.info( `aggregator microservice started at http://localhost:${ port }` );
} );