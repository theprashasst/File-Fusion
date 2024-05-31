import { ReadDir,ReadFile , AppendFile} from './file-methods.js';
import { generateJWT, validateSignup, JWTverify, validateSignin } from './Authentication.js';
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

app.post('/signup',async(req,res)=>{
    const userdata= req.body;
    if (validateSignup(userdata)){
        const existingUser= await Users.findOne({email:userdata.email});
        if (existingUser){
            res.status(400).json(`${userdata.email} already registered`)
        }

        else{
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

    }
    else{
        res.status(403).json({
            msg:"Wrong input type"
        })
    }

});


app.post('/signin',async(req,res)=>{
    const userdata= req.body;
    if (validateSignin(userdata)){
        const user= await Users.findOne({email:userdata.email});
        if (!user){
            res.status(401).json(`${userdata.email} is not registered with us`)
        }
        else{
            const check= user.password==userdata.password ? true: false;
            if (check){
                // AppendFile("users.txt",newuser.email+" ");
                const token = generateJWT(userdata);
                localStorage.authToken=token;
                // localStorage.setItem("authToken",token)
                console.log(user.name,"is logined");
                res.status(201).json({
                        msg:`${user.name} is successfully logined`,
                        Authorization:token
                })
            }
            else{
                console.log('Failed to login');
                res.status(401).json({
                   msg:"Password did not match"
                })

            }
        }
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

