import express, { request, response } from "express";
import { PORT,SECRET_KEY} from "./config.js"; 
import mongoose from "mongoose";
import cors from "cors";
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import { userSchema } from "./models/userschema.js";
import {connectToDatabase} from'./db.js';
import {requireLogin} from './routes/functions.js';



connectToDatabase();
const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: 'mongodb://127.0.0.1:27017/edu-hub', // Replace with your MongoDB connection string
  collection: 'sessions',
});


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
    session({
      secret: 'your-secret-key', // Replace with a secret key for session encryption
      resave: false,
      saveUninitialized: false,
      cookie:{secure:false ,maxAge:180* 60 *60},
      store: store,
    }) );
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

  const User = mongoose.model('Users', userSchema);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/uploads/'); // Specify the directory where uploaded files should be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
   // Use the original file name for storing
    }
  });

  const upload = multer({ storage: storage });
  let filePath=" ";
app.post('/saveUser', upload.single('photo'), async (req, res) => {
  try {
   // const userId = generateUserId();
    console.log(req.body); // Generate user ID
    const { name, mobileNumber, occupation, email, state, district, username, password, role, designation, updates_required } = req.body;
    filePath = `/uploads/${req.file}`;
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
      updates_required,
    });
    await newUser.save();
    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());


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


  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('Username:', username);
      console.log('Password:', password);
  
      const user = await User.findOne({ username });
      
      if (!user || password !== user.password) {
        return res.status(401).json({ error: 'Incorrect username or password' });
      }
      req.session.userId = user._id;
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  function requireLogin1(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
  }
  
  app.get('/profile', requireLogin1, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId).populate('data').exec();
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  async function fetchUser() {
    const response = await fetch('/api/profile');
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = response.json();
    setUser(data);
  }
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
