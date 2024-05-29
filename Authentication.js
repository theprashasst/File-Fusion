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

//validate inputs

export function validate(payload){
    const schema = z.object({
        email:z.string().email(),
        paassword:z.coerce.string()
    })
    return schema.safeParse(payload).success;
}

//middlewer for JWT verification

export function JWTverify(req,res,next){
    // const token=localStorage.getItem('authToken')
    const token=localStorage.authToken;
    
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            console.log("Could not verify");
            res.json("Please Login First");
        }
        else{
            console.log(`${decoded.email} user is logged in`)
            next();
        }
        
    }) 
}