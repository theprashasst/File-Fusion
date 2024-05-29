import { ReadDir,ReadFile } from './file-methods.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import express from 'express';
const app=express();
const port=8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.get("/All-files",async (req,res)=>{
    const files= await ReadDir();
    // res.send(files[0]);
    
    res.json(files);
    console.log(files);

})


app.listen(port,()=>{
    console.log("server live")
});

