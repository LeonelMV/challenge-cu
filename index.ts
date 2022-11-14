
import express, { Express } from 'express';
import dotenv from 'dotenv';

import routes from './routes';

const app: Express = express();
const expressSwagger = require('express-swagger-generator')(app);

let options: any = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/index.js'] //Path to the API handle folder
};
expressSwagger(options)

app.use(express.urlencoded({extended: false}));
app.use(express.json());

dotenv.config();

app.use('/api', routes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.port}`);
});