import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    mobileNumber: String,
    occupation: String,
    email: String,
    state: String,
    photo: String,
    district: String,
    username: String,
    password: String,
    id: String,  
  });
  export {userSchema};