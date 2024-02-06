import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js"; 
import mongoose from "mongoose";
import cors from "cors";
import fs from 'fs';
import readline from 'readline';
import { get } from "http";

const jsonlFilePath = './output.jsonl';

const rl = readline.createInterface({
    input: fs.createReadStream(jsonlFilePath),
    crlfDelay: Infinity 
});


let jsonData = [];

rl.on('line', (line) => {
    try {
        const jsonObject = JSON.parse(line);
        jsonData.push(jsonObject);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});

rl.on('close', () => {
    console.log(jsonData);
});


const app = express();

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('welcome');
});
app.get('/notifications',(request,response)=>{
     res.json(jsonData);
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