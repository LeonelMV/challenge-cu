"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const expressSwagger = require('express-swagger-generator')(app);
let options = {
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
    basedir: __dirname,
    files: ['./routes/index.js'] //Path to the API handle folder
};
expressSwagger(options);
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
dotenv_1.default.config();
app.use('/api', routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.port}`);
});
