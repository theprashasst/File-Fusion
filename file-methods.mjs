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
// (async ()=>{
//     const read=await ReadFile('file1.txt');
//     const dir=await ReadDir();
//     console.log(read,dir);
// })();

