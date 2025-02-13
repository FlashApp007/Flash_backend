/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-useless-catch */
import { CoreUserRepository } from '../../../../../libs/shared/repository/core_user';
import { generateOTP } from '../../../../../libs/shared/helpers/generate_otp';
import jwt from 'jsonwebtoken';
import { dbConfig } from '../../config/env';

const core_user = new CoreUserRepository();
export class AuthService {
    constructor() {}

    public async login(data: any) {
            try {
                // Implement login logic here
                console.log(data)
                const query = {
                    $or: [
                        { email: data?.login },
                        { mobile: data?.login }
                    ]
                };
                const user = await core_user.findBy(query);
                const otp = generateOTP();
                if(!user || user.length === 0){
                    const createData = {
                        email: data?.login,
                        mobile: data?.login,
                        password: data?.login,
                        firstName: data?.name || "john",
                        role: 'BUYER',
                        status: 'ACTIVE',
                        is_active: true,
                        fcm_token: data?.fcm_token || "",
                        otp: otp

                    }

                     const newUser = await core_user.create(createData);
                    return { message: 'User not found', status: false };
                }

                core_user.update(user[0].id, { otp:777777 });

                return { message: 'Login successful', status: true, data: user[0].id,role:user[0].role };
            } catch (error) {
                return { message: error.message, status: false };
            }
    }

    public async register(data: any) {
        try {
            const query = {
                    $or: [
                        { email: data?.login },
                        { mobile: data?.login }
                    ]
                };
            const existingUser = await core_user.findBy(query);
            if (existingUser) {
                return { message: 'User already exists', status: false };
            }
            
            const newUser = await core_user.create(data);
            return { message: 'Registration successful', status: true, data: newUser };
        } catch (error) {
            return { message: error.message, status: false };
        }
    }

    public async verifyOtp(data: any) {
        try {
            const user = await core_user.findById(data.id);
            if (!user) {
                return { message: 'User not found', status: false };
            }
            if (user.otp !== data.otp) {
                return { message: 'Invalid OTP', status: false };
            }
            await core_user.update(user.id, { otp: null });
            const token = jwt.sign({ payload: user }, dbConfig.JWT_SECRET, { expiresIn: '3d' });
            return { message: 'OTP verified successfully', status: true, token:token };
        } catch (error) {
            return { message: error.message, status: false };
        }
    }
}
