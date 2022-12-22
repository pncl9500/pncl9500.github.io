//cookie stuff turned off because swords dont eat cookies

// saveFile = [];

// function doCookieStuff(){
//   if(document.cookie === ''){
//     setCookieString("0/1/2");
//   }
//   console.log(document.cookie);
//   getSaveFileString();
//   console.log(saveFile);
//   //saveFile[2] = "10";
//   //saveToCookie();
//   //console.log(saveFile);
//   //console.log(document.cookie);
// }

// function setCookieString(cookieString){
//   var CookieDate = new Date;
//   CookieDate.setFullYear(CookieDate.getFullYear() + 3);
//   document.cookie = `${cookieString}; expires=` + CookieDate.toGMTString() + ';';
// }

// function getSaveFileString(){
//   stringy = document.cookie;
//   saveFile = [];
//   collector = "";
//   for (var i = 0; i < stringy.length; i++) {
//     if (stringy[i] === "/"){
//       parsed = parseInt(collector);
//       if (isNaN(parsed)){
//         saveFile.push(collector);
//       } else {
//         saveFile.push(parsed);
//       }
//       collector = "";
//     } else {
//       collector += stringy[i];
//     }
//   }
//   saveFile.push(collector);
//   collector = "";
// }

// function saveToCookie(){
//   stringy = ""
//   for (var i = 0; i < saveFile.length; i++){
//     stringy += saveFile[i];
//     if (i !== saveFile.length - 1){
//       stringy += "/";
//     }
//   }
//   setCookieString(stringy);
// }


