import { loginRouter } from './login.js';

export const registerRouters = (app) => {
    app.use('/login', loginRouter);
    return app
}
