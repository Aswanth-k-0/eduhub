import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import {verifyToken,storage} from './functions.js';
import { userSchema } from "../models/userschema.js";
import { retrieveData,retrievelist,retrieveLatest } from './retriveuserdata.js';
import { all } from 'axios';

const router = express.Router();
const encoder =bodyParser.urlencoded({extended:true});

const upload = multer({ storage: storage });
let filePath=" ";
const User = mongoose.model('Users', userSchema);


router.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('welcome');
});
router.get('/signUp',async (req,res)=>{
    const uninqueTags = await retrievelist();
    res.json(uninqueTags);
})
router.post('/saveFormat',verifyToken,async (req,res)=>{
  let selectedOptions = req.body.dropdownValues;
  let user = req.user.userData.username;
  // console.log("hel=",selectedOptions);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: user },
      { $set: { format: selectedOptions } }, // Update 'format' field with selected options
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(201).json({ message: 'User format saved successfully', updatedUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' }); // Generic error for unexpected issues
  }
});
router.post('/saveData', async (req, res) => {
    try {
      const newData = new Data(req.body);
      await newData.save();

      db.collection(user, (err, collection) => {
        if (err) { 
            console.error("Error accessing collection:", err);
            return;
        }
        
        
        // Perform operations on the collection
        // For example, you can query, insert, update, or delete documents
        collection.find({}).toArray((err, documents) => {
            if (err) {
                console.error("Error querying collection:", err);
                return;
            }
            console.log("Documents in collection:", documents);
        });
    });


      res.status(200).send('Data saved successfully');
    } catch (error) {
      console.error('Error:', error); 
      res.status(500).send('Internal Server Error');
    }
  });


 router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('Username:', username);
      console.log('Password:', password);
  
      const user = await User.findOne({ username });
      
      if (!user || password !== user.password) {
        return res.status(401).json({ error: 'Incorrect username or password' });
      }
      const token=jwt.sign({
          userData:user
      },SECRET_KEY)
 
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }); 
 
router.get('/profile',verifyToken ,async (req, res) => {
   
    const user = req.user; 
    res.status(200).json({ status: 'success', message: 'Authentication successful', user });
  });

router.post('/editUser',async(req,res)=>{
  try {
    // const userId = generateUserId();
     console.log('Cookies:', req.headers);
     console.log(req.body); 
     const bearerToken = req.headers.authorization;

     if (!bearerToken) {
       return res.status(401).json({ error: 'Unauthorized: No token provided' });
     }
     // Extract the token without the "Bearer " prefix
     const token = bearerToken.split(' ')[1];
     let decoded= jwt.verify(token,SECRET_KEY);
     let str=decoded.userData.username;// Generate user ID
     const { name, mobileNumber, occupation, email, state, district, username, password, role, designation, updates_required } = req.body;
     console.log(req.body);
     filePath = `/uploads/${req.file.filename}`;
     console.log('file',filePath);
     // Create a new user instance with photo path
     const newUser = new User({
       name,
       mobileNumber,
       occupation,
       email,
       state,
       photo: filePath, // Save the file path in the photo field
       district,
       username,
       password,
       role,
       designation,
       updates_required:updates_required,
     });
     console.log("asd",newUser.username)
     await User.findOneAndUpdate(
      { username:str },
      update,
      { new: true } // Return the updated user document
    );
     res.status(201).json({ message: 'User saved successfully' });
   } catch (error) {
     console.error('Error saving user:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
})
router.get('/notifications', async (req, res) => {
  // console.log('Cookies:', req.headers);
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  // Extract the token without the "Bearer " prefix
  const token = bearerToken.split(' ')[1];

  try {
      const decoded = jwt.verify(token,SECRET_KEY);
      // console.log("data=",decoded);
      // const designation = decoded.userData.designation;
      if(req.query.page){
        const page = parseInt(req.query.page) || 1; // Get page number from the query parameter, default to 1
        const limit = 5; // Get limit from the query parameter, default to 5
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let str=decoded.userData.updates_required;
        const interests = str.split(","); 
        const allNotifications = await retrieveData(interests);  // Retrieve all notifications (modify as per your actual retrieval logic)
        //console.log (allNotifications)
        const paginatedNotifications = allNotifications.slice(startIndex, endIndex);
    
        res.json(paginatedNotifications);
      }else{
        const decoded = jwt.verify(token,SECRET_KEY);
        // console.log("data=",decoded);
        let str=decoded.userData.updates_required;
        const interests = str.split(","); 
        console.log(interests)
        const allNotifications = await retrieveData(interests);
        console.log(allNotifications);
        res.json(allNotifications)
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get('/getLatest', async (req, res) => {
    // console.log('Cookies:', req.headers);
    const bearerToken = req.headers.authorization;
  
    if (!bearerToken) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    // Extract the token without the "Bearer " prefix
    const token = bearerToken.split(' ')[1];
  
    try {
        const decoded = jwt.verify(token,SECRET_KEY);
        // console.log("data=",decoded);
          let str=decoded.userData.updates_required;
          const allNotifications = await retrieveLatest();  // Retrieve all notifications (modify as per your actual retrieval logic)
          console.log(allNotifications);
          res.json(allNotifications);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  router.get('/verify',(req,res)=>{
      const token = req.headers.authorization;
    
      if (!token) {
         res.status(401).json({ message: 'Unauthorized: No token provided' });
      }else{
         res.status(200).json({message:"user verifie"})
      }
  })
router.post('/saveUser', upload.single('photo'), async (req, res) => {
    try {
     // const userId = generateUserId();
      console.log(req.body); // Generate user ID
      const { name, mobileNumber, occupation, email, state, district, username, password, role, designation, updates_required } = req.body;
      filePath = `/uploads/${req.file.filename}`;
      console.log('file',filePath);
      console.log(updates_required);
      // Create a new user instance with photo path
      const newUser = new User({
        name,
        mobileNumber,
        occupation,
        email,
        state,
        photo: filePath, // Save the file path in the photo field
        district,
        username,
        password,
        role,
        designation,
        updates_required:updates_required,
      });
      console.log("asd",newUser.username)
      await newUser.save();
      res.status(201).json({ message: 'User saved successfully' });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router;