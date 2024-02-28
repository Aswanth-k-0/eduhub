import express, { request, response } from "express";
import { PORT,SECRET_KEY} from "./config.js"; 
import mongoose from "mongoose";
import cors from "cors";
import {connectToDatabase} from'./db.js';
import {retrieveData} from './routes/retriveuserdata.js';
import routes from './routes/routes.js';

connectToDatabase();
const dataSchema = new mongoose.Schema({
  college: String,
  title: String,
  date: String, // Assuming date is stored as a string, modify as needed
  link: String,
  gect_document_link: String,
  geci_date: String,
  geci_document_link: String,
  type: String,
});

const Data = mongoose.model('data', dataSchema);



 const app = express();
 app.use(cors());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());

  // const Session = mongoose.model('sessions', sessionSchema);






app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: 'File upload error' });
    } else {
        next(err);
    }
});
app.use('/', routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
