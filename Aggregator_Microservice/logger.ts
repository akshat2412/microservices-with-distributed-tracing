import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [new transports.File({
        filename: './logs/aggregator.log',
    })],
});

const stream = {
    write: (message: any) => {
      logger.info(message);
    },
};
export  {logger, stream};