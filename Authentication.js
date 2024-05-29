import jwt from 'jsonwebtoken';
import z from 'zod';

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