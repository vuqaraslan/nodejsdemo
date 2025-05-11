import fs from "fs";

//Cox vaxt bu asinxron formadakini istifade edirik
// fs.readFile('./test.txt','utf-8',(err,data)=>{
//     if(err){
//         console.error('Error reading file : ',err);
//         return;
//     }
//     console.log("File content : ",data);
// });

//Bu formada sinxron metod islemir
// fs.readFileSync("./test.txt","utf-8",(err,data)=>{
//     if(err){
//         console.error("Error reading file : ",err);
//         return;
//     }
//     console.log("Async File content : ",data);
// });

// const fileContents=fs.readFileSync("./test.txt","utf-8",(err,data)=>{
//     if(err){
//         console.error("Error reading file : ",err);
//         return;
//     }
//     // console.log("Async File content : ",data);
//     return data;
// });
// console.log(fileContents);

// const data="This is data for writing to the text file !\n";
// fs.writeFile("./writeDemo.txt",data,(err)=>{
//     if(err){
//         console.error('Error writiing file : ',err);
//         return;
//     }
//     console.log('Data writed successfully !');
// });

// fs.appendFile("./writeDemo.txt",data,(err)=>{
//     if(err){
//         console.error('Error reading file : ',err);
//         return;
//     }
//     console.log('Data appended successfully !');
// });

// fs.mkdir("./testDir",(err)=>{
//     if(err){
//         console.error('Error creating directory : ',err);
//         return;
//     }
//     console.log('Directory created successfully !');
// });

// fs.rmdir('./testDir',(err)=>{
//     if(err){
//         console.error('Error deleting directory : ',err);
//         return;
//     }
//     console.log('Directory deleted successfully !');
// });

// fs.unlink('./deleteDemo.txt',(err)=>{
//     if(err){
//         console.error('Error deleting file : ',err);
//         return;
//     }
//     console.log('File deleted successfully !');
// });

// fs.rename("./test.txt",'renamedTest.txt',(err)=>{
//     if(err){
//         console.error('Error renamed file : ',err);
//         return;
//     }
//     console.log('File renamed successfully !');
// });


// Read file and write to the another file
// fs.readFile("./renamedTest.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error("Error reading file : ", err);
//     return;
//   }
//   // console.log("File content : ",data);

//   fs.writeFile("./writeDemo.txt", data, (err) => {
//     if (err) {
//       console.error("Error writiing file : ", err);
//       return;
//     }
//     console.log("Data writed successfully !");
//   });
// });
