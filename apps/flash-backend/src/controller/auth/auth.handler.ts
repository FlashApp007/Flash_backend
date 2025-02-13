import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthHandler {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public login = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    public register = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
