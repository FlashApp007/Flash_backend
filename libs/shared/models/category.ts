//@ts-nocheck
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema(
    {
        id: { type: Number, unique: true },
        domain: { type: String },
        category: { type: String },
        sub_category: { type: String, default: "" },
        icon: { type: String, default: "" },
        is_active: { type: Boolean },
        created_by_user: { type: Object },
        updated_by_user: { type: Object },
        createdAt: {type : Date, default: Date.now},
        updatedAt: {type: Date},
    },
    { timestamps: true, _id: true }
);

categorySchema.pre('save', async function (next) {
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

categorySchema.index({ id: 1, createdAt: -1 });
categorySchema.plugin(mongoosePaginate)

const ondc_category = mongoose.model('ondc_category', categorySchema, "ondc_category")

export default ondc_category;