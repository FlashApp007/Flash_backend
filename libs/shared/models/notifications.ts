// @ts-nocheck
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const NotificationHistorySchema = new mongoose.Schema({
        id: { type: Number, unique: true },
        message: { type: String }, 
        user_id: { type: Number },
        user_details:{type: Object},
        read_message: { type: Boolean, default: false },
        subject: { type: String },
        },
         { timestamps: true, _id: true }
        )

NotificationHistorySchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const latestDocument = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
            this.id = latestDocument ? latestDocument.id + 1 : 1;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

NotificationHistorySchema.index({ id: 1, createdAt: -1 });
NotificationHistorySchema.plugin(mongoosePaginate)

const NotificationHistory = mongoose.model('Notification', NotificationHistorySchema, "NotificationHistory")

export default NotificationHistory;