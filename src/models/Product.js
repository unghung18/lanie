import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    sale: {
        type: String,
        enum: [0, '10%', '20%', '30%', '40%', '50%']
    },
    size: {
        type: Array,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    inventory: {
        type: Number,
        require: true
    },

}, { timestamps: true })

export default mongoose.models.Product || mongoose.model("Product", productSchema);

