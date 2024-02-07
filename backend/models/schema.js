import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    name: String,
    id: String,
    password: String,
    photo: String,
    phno: String,
    email: String,
    occupation: String,
    state: String,
    district: String,
    username: String,
    role: String,
    designation : String,
    field_of_intrest: String,
    updates_required: String,
  });
export{Schema};