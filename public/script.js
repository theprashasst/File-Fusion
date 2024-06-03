
async function fetchfiles(){

  const response= await fetch("/All-files");
  // const response = schema.safeParse(files);
  const files= await response.json();
  console.log(files)
  
  // console.log(response);
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


// DOM

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  fetchfiles(); // Call fetchFiles on DOMContentLoaded
});