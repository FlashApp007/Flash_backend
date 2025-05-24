import { Router } from 'express';
import { CoreUserHandler } from './core_user.handler';

export class CoreUserRoute {
    public router: Router;
    private coreUserHandler: CoreUserHandler;

    constructor() {
        this.router = Router();
        this.coreUserHandler = new CoreUserHandler();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Get all users
        this.router.get('/', this.coreUserHandler.getAllUsers);
        
        // Get user by ID
        this.router.get('/:id', this.coreUserHandler.getUserById);
        
        // Get user by email
        this.router.get('/email/:email', this.coreUserHandler.getUserByEmail);
        
        // Create new user
        this.router.post('/', this.coreUserHandler.createUser);
        
        // Update user
        this.router.put('/:id', this.coreUserHandler.updateUser);
        
        // Delete user
        this.router.delete('/:id', this.coreUserHandler.deleteUser);
        
        // Update user status
        this.router.patch('/:id/status', this.coreUserHandler.updateUserStatus);
        
        // Get users by role
        this.router.get('/role/:role', this.coreUserHandler.getUsersByRole);
        
        // Update user profile image
        this.router.patch('/:id/profile-image', this.coreUserHandler.updateProfileImage);
        
        // Update user address
        this.router.patch('/:id/address', this.coreUserHandler.updateAddress);
        
        // Update user FCM token
        this.router.patch('/:id/fcm-token', this.coreUserHandler.updateFcmToken);
    }
}
