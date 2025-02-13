// @ts-nocheck
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";



const addressSchema = new mongoose.Schema(
    {
        id: { type: Number, unique: true },
        Name: { type: String },
        address_line_1: { type: String },
        address_line_2:  { type: String },
        address_line_3: { type: String },
        city: { type: String },
        email: { type: String },
        gps: { type: String },
        phone_number: { type: String },
        pincode: { type: String },
        state: { type: String },
        created_by_id: { type: Number }

    },
    { timestamps: true, _id: true }
);

addressSchema.pre('save', async function (next) {
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

addressSchema.index({ id: 1, createdAt: -1 });
addressSchema.plugin(mongoosePaginate)

const address = mongoose.model('address', addressSchema, "address")

export default address;
