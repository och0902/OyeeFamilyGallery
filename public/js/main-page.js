'use strict';

// function imgFileList() {

  console.log('<h1>imgFileList 함수에 접속됨</h1>'); 
  document.write('<h1>imgFileList 함수에 접속됨</h1>');

  //requiring path and fs modules
  const path = require('path');
  document.write('require path 통과');
  const fs = require('fs');
  //joining path of directory 
  const directoryPath = path.join(__dirname, 'Documents');
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      //listing all files using forEach
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          console.log(file); 
          document.write(file);
      });
  });

// }


// document.write('<h1>main-page.js 접속</h1>');

// var fs = require('fs');

// function htmlList(filelist) {
//   var list = '';
//   while (i=0, i < filelist.length, i++) {
//     list += `<a href="${filelist[i]}">${filelist[i]}</a>`;
//   }
//   return list;
// }

// fs.readdir('.', (error, filelist) => {
//   document.write(filelist);
//   console.log(filelist);
//   var list = htmlList(filelist);
//   response.writeHead(200);
//   response.end(list);
// });

// console.log(directory);
// console.log(xmlHttp);
