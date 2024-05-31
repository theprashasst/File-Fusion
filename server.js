import { ReadDir,ReadFile , AppendFile} from './file-methods.js';
import { generateJWT, validate, JWTverify } from './Authentication.js';
import { Users } from './Databases.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

import express from 'express';
const app=express();
const port=8000;

//local in memory storage

export const localStorage={
    authToken:"invalid"
};



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

//signup endpoint

app.post('/signup',(req,res)=>{
    const userdata= req.body;
    if (validate(userdata)){

        const newuser=new Users(userdata);
        newuser.save()
        .then(
            (user)=>{
                console.log(user.name,"is registered");
                res.status(201).json({
                    msg:`${user.name} is successfully registered`
                })
            }
        )
        .catch(
            (err)=>{
                console.log("user adding failed \n",err);
                res.status(201).json({
                    msg:'Failed to register'
                })
            }
        );
        


    }
    else{
        res.status(403).json({
            msg:"Wrong input type"
        })
    }

});




app.post('/signin',(req,res)=>{
    const newuser= req.body;
    if (validate(newuser)){
        // AppendFile("users.txt",newuser.email+" ");
        const token = generateJWT(user);
        localStorage.authToken=token;
        // localStorage.setItem("authToken",token)
        res.json("Success");
    }
    else{
        res.status(403).json({
            msg:"Wrong input type"
        })
    }
});

app.get("/logout",(req, res)=>{
    localStorage.authToken="invalid";
    // res.status(302).redirect("/signin");
    res.status(302).json("Loged Out");
    
});

app.get("/users",JWTverify,async (req,res)=>{
    let user= await ReadFile("users.txt");
    console.log(user);
    
    res.status(201).json(user);
});



app.listen(port,()=>{
    console.log("server live")
});

