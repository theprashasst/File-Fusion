import { ReadDir, ReadFile } from "../file-methods.mjs";
import {z} from 'zod';
// async function ReadDir(){
//   const files=await fs.readdir("Sharable-Folder")
//   return files
// }

async function fetchfiles(){
  const schema= z.array(z.string());
  // const schema =z.object();

  const files= await ReadDir();
  const response = schema.safeParse(files);
  console.log(files)
  console.log(response);
  // const files= JSON.parse(data)
  const list= document.getElementById("myList")
  files.forEach(currFile=>{
      const file= document.createElement("li");
      file.textContent=currFile;
      list.appendChild(file);
      console.log(currFile)
    });
}
console.log("yohoho")
// fetchfiles();

// document.addEventListener('DOMContentLoaded',fetchfiles)
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  fetchfiles(); // Call fetchFiles on DOMContentLoaded
});