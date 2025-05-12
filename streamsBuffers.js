import fs from "fs";

// const messages="Hello my students !";
// const buffer=Buffer.from(messages,'utf-8');
// console.log(buffer);
// const dataBuffer=Buffer.alloc(10,1,'utf-16le');
// console.log(dataBuffer);

// const readable = fs.createReadStream("renamedTest.txt", { encoding: "utf-8" });
// // console.log(readable);renamedTest
// const writable=fs.createWriteStream("writeDemo.txt",{encoding:'utf-8'});


// let body='';
// readable.on("data", (chunk) => {
//   console.log(chunk);
// //   body+=chunk.toString();

//     writable.write(chunk);
// });

// readable.on('end',()=>{
//     console.log('____________________')
//     console.log(body);
// });

//readable-dan oxuyub writable-a yazir.
// readable.pipe(writable);


const filesArray=['firstRead.txt','secondRead.txt','thirdRead.txt'];
const writable=fs.createWriteStream("writeDemo.txt",{encoding:'utf-8'});

filesArray.map((fileName)=>{
    const readable = fs.createReadStream(fileName, { encoding: "utf-8" });
    readable.pipe(writable);
});

