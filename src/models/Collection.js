import mongoose from "mongoose";

const { Schema } = mongoose;

const collectionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    bannerImg: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]

}, { timestamps: true })

export default mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

