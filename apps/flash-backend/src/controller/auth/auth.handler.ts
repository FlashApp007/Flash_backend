import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthHandler {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public login = async (req: Request, res: Response) => {
        try {
            console.log('Request body:', req.body);
            console.log('Request headers:', req.headers);
            console.log('Request query:', req.query);
            
            const body = req.body || {};
            
            if (!body.login) {
                return res.status(400).json({ 
                    status: false,
                    message: 'Login credential (email or mobile) is required' 
                });
            }

            const result = await this.authService.login(body);
            res.status(200).json(result);
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ 
                status: false,
                message: error.message || 'Internal server error'
            });
        }
    };

    public register = async (req: Request, res: Response) => {
        try {
            console.log('Request body:', req.body);
            console.log('Request headers:', req.headers);
            console.log('Request query:', req.query);
            const result = await this.authService.register(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ 
                status: false,
                message: error.message
            });
        }
    };

    public verifyOtp = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.verifyOtp(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
