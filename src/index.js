import express from 'express';
import { registerRouters } from './routers/index.js';


export const create_app = () => {
    var app = express();
    app.use(express.json());
    var app = registerRouters(app)
    return app
}