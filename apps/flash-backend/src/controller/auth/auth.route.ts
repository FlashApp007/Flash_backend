import { Router } from 'express';
import { AuthHandler } from './auth.handler';

export class AuthRoute {
    public router: Router;
    private authHandler: AuthHandler;

    constructor() {
        this.router = Router();
        this.authHandler = new AuthHandler();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/login', this.authHandler.login);
        this.router.post('/register', this.authHandler.register);
        this.router.post('/verify-otp', this.authHandler.verifyOtp);
    }
}
