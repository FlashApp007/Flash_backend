/* eslint-disable no-useless-catch */
import NotificationHistory from '../models/notifications';

export class NotificationsRepository {
    async create(notificationData: any) {
        try {
            const notification = new NotificationHistory(notificationData);
            return await notification.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        try {
            return await NotificationHistory.findOne({ id });
        } catch (error) {
            throw error;
        }
    }

    async findByUserId(user_id: number) {
        try {
            return await NotificationHistory.find({ user_id }).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateData: any) {
        try {
            return await NotificationHistory.findOneAndUpdate(
                { id },
                { $set: updateData },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async markAsRead(id: number) {
        try {
            return await NotificationHistory.findOneAndUpdate(
                { id },
                { $set: { read_message: true } },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            return await NotificationHistory.findOneAndDelete({ id });
        } catch (error) {
            throw error;
        }
    }

    async list(query: any = {}, options: any = {}) {
        try {
            return await NotificationHistory.paginate(query, options);
        } catch (error) {
            throw error;
        }
    }

    async upsert(notificationData: any) {
        try {
            return await NotificationHistory.findOneAndUpdate(
                { id: notificationData.id },
                { $set: notificationData },
                { upsert: true, new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async findBy(query: any = {}) {
        try {
            return await NotificationHistory.find(query);
        } catch (error) {
            throw error;
        }
    }
}