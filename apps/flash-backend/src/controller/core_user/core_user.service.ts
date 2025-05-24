/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-useless-catch */
import { CoreUserRepository } from '../../../../../libs/shared/repository/core_user';

export class CoreUserService {
    private coreUserRepository: CoreUserRepository;

    constructor() {
        this.coreUserRepository = new CoreUserRepository();
    }

    public async getAllUsers() {
        try {
            const users = await this.coreUserRepository.list();
            return { success: true, data: users };
        } catch (error) {
            throw new Error(`Failed to get users: ${error.message}`);
        }
    }

    public async getUserById(id: number) {
        try {
            const user = await this.coreUserRepository.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to get user: ${error.message}`);
        }
    }

    public async getUserByEmail(email: string) {
        try {
            const user = await this.coreUserRepository.findByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to get user: ${error.message}`);
        }
    }

    public async createUser(userData: Record<string, unknown>) {
        try {
            // Check if user with the same email already exists
            if (userData.email) {
                const existingUser = await this.coreUserRepository.findByEmail(userData.email as string);
                if (existingUser) {
                    throw new Error('User with this email already exists');
                }
            }
            
            const user = await this.coreUserRepository.create(userData);
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    public async updateUser(id: number, userData: Record<string, unknown>) {
        try {
            // Check if user exists
            const existingUser = await this.coreUserRepository.findById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            
            // If email is being updated, check if it's already in use by another user
            if (userData.email && userData.email !== existingUser.email) {
                const userWithEmail = await this.coreUserRepository.findByEmail(userData.email as string);
                if (userWithEmail && userWithEmail.id !== id) {
                    throw new Error('Email is already in use by another user');
                }
            }
            
            const user = await this.coreUserRepository.update(id, userData);
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    public async deleteUser(id: number) {
        try {
            const user = await this.coreUserRepository.delete(id);
            if (!user) {
                throw new Error('User not found');
            }
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }

    public async updateUserStatus(id: number, status: string) {
        try {
            // Check if user exists
            const existingUser = await this.coreUserRepository.findById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            
            const user = await this.coreUserRepository.update(id, { status });
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to update user status: ${error.message}`);
        }
    }

    public async getUsersByRole(role: string) {
        try {
            const users = await this.coreUserRepository.findBy({ role });
            return { success: true, data: users };
        } catch (error) {
            throw new Error(`Failed to get users by role: ${error.message}`);
        }
    }

    public async updateProfileImage(id: number, profileImage: string) {
        try {
            // Check if user exists
            const existingUser = await this.coreUserRepository.findById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            
            const user = await this.coreUserRepository.update(id, { profile_image: profileImage });
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to update profile image: ${error.message}`);
        }
    }

    public async updateAddress(id: number, address: Record<string, unknown>) {
        try {
            // Check if user exists
            const existingUser = await this.coreUserRepository.findById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            
            const user = await this.coreUserRepository.update(id, { address });
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to update address: ${error.message}`);
        }
    }

    public async updateFcmToken(id: number, fcmToken: string) {
        try {
            // Check if user exists
            const existingUser = await this.coreUserRepository.findById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            
            const user = await this.coreUserRepository.update(id, { fcm_token: fcmToken });
            return { success: true, data: user };
        } catch (error) {
            throw new Error(`Failed to update FCM token: ${error.message}`);
        }
    }
}
