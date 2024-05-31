import jwt from 'jsonwebtoken';
import z from 'zod';
import { localStorage } from './server.js';

//secet key

const secretKey="Prashasst-ki-key";

//generate JWT

export function generateJWT(payload){
    const token =jwt.sign(payload,secretKey);
    return token;
}

//validate Signup inputs

export function validateSignup(userdata){
    const schema = z.object({
        name:z.string(),
        email:z.string().email(),
        password:z.coerce.string()
    })
    return schema.safeParse(userdata).success;
}

export function validateSignin(userdata){
    const schema= z.object({
        email:z.string().email(),
        password:z.coerce.string()
    })
    return schema.safeParse(userdata);
}

//middlewer for JWT verification

export function JWTverify(req,res,next){
    // const token=localStorage.getItem('authToken')
    const token=localStorage.authToken;
    
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            console.log("Could not verify");
            res.status(401).json("Please Login First");
        }
        else{
            console.log(`${decoded.email} is logged in`)
            next();
        }
        
    }) 
}