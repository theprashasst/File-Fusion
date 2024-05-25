import { ReadDir,ReadFile } from './file-methods.mjs';

import express from 'express';
const app=express();
const port=8000;



app.get("/All-files",async (req,res)=>{
    const files= await ReadDir();
    res.send(files);
    console.log(files);

})


app.listen(port,()=>{
    console.log("server live")
});

