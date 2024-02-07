import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js"; 
import mongoose from "mongoose";
import cors from "cors";
import fs from 'fs';
import readline from 'readline';
import { get } from "http";
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

function generateUserId() {
    // Generate a UUID
    const uuid = uuidv4();

    // Hash the UUID using SHA-256
    const hash = crypto.createHash('sha256').update(uuid).digest('hex');

    // Take a substring to limit the length to 10-12 characters
    const userId = hash.substring(0, 10); // Adjust the substring range as needed

    return userId;
}

 const app = express();

 app.use(
     cors()
    );

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('welcome');
});
app.get('/notifications',(req,res)=>{
     res.json(jsonData);
});


 mongoose.connect('mongodb://127.0.0.1:27017/edu-hub')
 .then(()=>{
     console.log("connected to MongoDB");

 }).catch((error)=>{
     console.log(error)
 });


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
  
  const User = mongoose.model('User', userSchema);
  const upload = multer({ dest: 'uploads/' });
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // API endpoint to save user data
  app.post('/saveUser', upload.single('photo'), async (req, res) => {
    console.log(req.body);
    const userId = generateUserId();
    console.log(userId);


    try {
      // Create a new user instance
      const db = mongoose.db();
      const collection = db.collection('mycollection');

      const newData = req.body; // Assuming data is sent in the request body
      const result = await collection.insertOne(newData);
    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 



app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: 'File upload error' });
    } else {
        next(err);
    }
});

 
  
  app.post('/saveData', async (req, res) => {
    try {
      const newData = new Data(req.body);
      await newData.save();
      res.status(200).send('Data saved successfully');
    } catch (error) {
      console.error('Error:', error); 
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/preference',async (req,res)=>{
    console.log(req.body);

 })


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
