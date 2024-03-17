import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { SECRET_KEY } from '../config.js';
  // export {requireLogin};

  const generateUserId = () => {
    // Generate a UUID
    const uuid = uuidv4();

    // Hash the UUID using SHA-256
    const hash = crypto.createHash('sha256').update(uuid).digest('hex');

    // Take a substring to limit the length to 10-12 characters
    const userId = hash.substring(0, 10); // Adjust the substring range as needed

    return userId;
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log("token="+token);
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized: No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token,SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token' });
  }
 };

async function fetchUser() {
  const response = await fetch('/api/profile');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = response.json();
  setUser(data);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads/'); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
 // Use the original file name for storing
  }
});
export {generateUserId,verifyToken,storage};