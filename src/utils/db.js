import mongoose from "mongoose";

const connectDb = async () => {
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Mongo connection successfully established. !!!!")
    } catch (error) {
        throw new Error("Error connecting to mongo")
    }
}
export default connectDb;