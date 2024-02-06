import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js"; 
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('welcome');
});


mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("connected to MongoDB");
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`);
    });

})
.catch((error)=>{
    console.log(error)
});