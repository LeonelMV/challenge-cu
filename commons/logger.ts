import winston, { Logger } from 'winston';

const logger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  defaultMeta: '',
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/warning.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export = logger;