import { json } from 'express';
import fss from 'fs';
const fs= fss.promises;

export async function ReadFile(file_name){
    try {const data =await fs.readFile(`Sharable-Folder/${file_name}`,"utf-8")
        return data;
        }
    catch(error){
        // console.error();
        return "No such file Available"
    }
}
export async function ReadDir(){
    const files=await fs.readdir("Sharable-Folder")
    return files
}

export async function AppendFile(file_name,data){
    const path=`Sharable-Folder/${file_name}`;
    await fs.appendFile(path,data,(err)=>{
        if (err){
            return false;
        }
        return true
    });



}


//Testing the functions below
// (async ()=>{
//     const read=await ReadFile('file1.txt');
//     const data=await ReadDir();
//     // const dir =JSON.parse(data)
//     console.log(typeof data)
//     console.log(data);
// })();

