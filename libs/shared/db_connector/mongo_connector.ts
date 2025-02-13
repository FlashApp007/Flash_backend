import { connect, Connection } from 'mongoose';
import { dbConfig } from '../config/db.config';

export const connectToMongoDB = async (): Promise<Connection> => {
    try {
        const connection = await connect(dbConfig.MONGODB_URL);
        console.log('Successfully connected to MongoDB.');
        return connection.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};