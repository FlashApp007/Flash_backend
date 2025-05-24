import { Request, Response } from 'express';
import { CoreUserService } from './core_user.service';

export class CoreUserHandler {
    private coreUserService: CoreUserService;

    constructor() {
        this.coreUserService = new CoreUserService();
    }

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const result = await this.coreUserService.getAllUsers();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getUserById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: 'Invalid ID format' });
            }
            
            const result = await this.coreUserService.getUserById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getUserByEmail = async (req: Request, res: Response) => {
        try {
            const { email } = req.params;
            const result = await this.coreUserService.getUserByEmail(email);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public createUser = async (req: Request, res: Response) => {
        try {
            const userData = req.body;
            const result = await this.coreUserService.createUser(userData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public updateUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: 'Invalid ID format' });
            }
            
            const userData = req.body;
            const result = await this.coreUserService.updateUser(id, userData);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: 'Invalid ID format' });
            }
            
            const result = await this.coreUserService.deleteUser(id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public updateUserStatus = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: 'Invalid ID format' });
            }
            
            const { status } = req.body;
            
            if (!status) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Status is required' 
                });
            }
            
            const result = await this.coreUserService.updateUserStatus(id, status);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public getUsersByRole = async (req: Request, res: Response) => {
        try {
            const { role } = req.params;
            const result = await this.coreUserService.getUsersByRole(role);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public updateProfileImage = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: 'Invalid ID format' });
            }
            
            const { profile_image } = req.body;
            
            if (!profile_image) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Profile image URL is required' 
                });
            }
            
            const result = await this.coreUserService.updateProfileImage(id, profile_image);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public updateAddress = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: 'Invalid ID format' });
            }
            
            const { address } = req.body;
            
            if (!address) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Address data is required' 
                });
            }
            
            const result = await this.coreUserService.updateAddress(id, address);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public updateFcmToken = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, error: 'Invalid ID format' });
            }
            
            const { fcm_token } = req.body;
            
            if (!fcm_token) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'FCM token is required' 
                });
            }
            
            const result = await this.coreUserService.updateFcmToken(id, fcm_token);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };
}
