import express, { request, response } from "express";
import { PORT} from "./config.js"; 
import mongoose from "mongoose";
import cors from "cors";
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { userSchema } from "./models/userschema.js";
import {connectToDatabase} from'./db.js';


connectToDatabase();

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
    const userId = generateUserId(); // Generate user ID
    const { name, mobileNumber, occupation, email, state, district, username, password, role, designation, updates_required } = req.body;
    filePath = `/uploads/${req.file.originalname}`;
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
      updates_required
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // API endpoint to save user data
//   app.post('/saveUser', upload.single('photo'), async (req, res) => {
//     console.log(req.body);
//     const userId = generateUserId();
//     console.log(userId);


//     try {
//       // Create a new user instance
//       const db = mongoose.connection.getClient();
//       const collection = db.db().collection('users');

//       const newData = req.body; // Assuming data is sent in the request body
//       const result = await collection.insertOne(newData);
//     res.status(201).json({ message: 'User saved successfully' });
//   } catch (error) {
//     console.error('Error saving user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }); 



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
    
    const { username, password } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        // User not found
        return res.status(401).json({ error: 'Incorrect username or password' });
      }
  
      // Compare passwords
      //const passwordMatch = await bcrypt.compare(password, user.password);
      console.log( password);
      if (password!=user.password) {
        // Passwords don't match
        return res.status(401).json({ error: 'Incorrect username or password' });
        console.log("here");
      }
      return res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
