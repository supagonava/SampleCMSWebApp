import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';

import AuthController from '../controllers/auth.controller';

class AuthRoute implements Routes {
    public path = '/api/v1/auth';
    public router = Router();
    public controller = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.controller.signin);
        this.router.post(`${this.path}/refresh`, this.controller.refresh);
    }
}

export default AuthRoute;
