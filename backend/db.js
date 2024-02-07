// db.js
import mongoose from "mongoose";

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/edu-hub');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
export {connectToDatabase};
