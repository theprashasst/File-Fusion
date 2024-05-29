import { ReadDir,ReadFile , AppendFile} from './file-methods.js';
import { generateJWT, validate } from './Authentication.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

import express from 'express';
const app=express();
const port=8000;

//local in memory storage

const users=[]



//middlewares

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/All-files",async (req,res)=>{
    const files= await ReadDir();
    // res.send(files[0]);
    
    res.json(files);
    console.log(files);

})

app.post('/signin',(req,res)=>{
    const payload= req.body;
    if (validate(payload)){
        AppendFile("users.txt",payload.email+" ");
        users.push(payload.email)
        const token = generateJWT(payload);
        res.json(token);
        console.log(users);
    }
    else{
        res.status(403).json({
            msg:"Wrong input type"
        })
    }
});

app.get("/users",async (req,res)=>{
    let user= await ReadFile("users.txt");
    console.log(user);
    res.status(201).json(user);

});



app.listen(port,()=>{
    console.log("server live")
});

