var CryptoJS = require("crypto-js");
const fs = require('fs');

let cycle = 1000000;
let hashes = Array(cycle);
let i = 0;
let hash = "1992092119670422196611551989071919941021199801101994091719940225";
let target = "ec08edd6094129465154ed7384020658c21b941e63ac9ce014689de25942a301";

calc = () => {
  while(true) {
    hashes[i] = hash;
    i++;
    hash = String(CryptoJS.SHA256(String(hash)));
    if (i == cycle) {
      fs.writeFileSync("./hash.txt", hashes.join(","));
      i = 0;
    }
    if (hash == target || hash == "4acc6ea1eb43f8bf8583c75b853b4f8e71423a931a818591cdac1488915e9ba1") {
      hashes[i] = hash;
      for (i = i + 1; i < cycle; i++) {
        hashes[i] = "";
      }
      fs.writeFileSync("./hash1.txt", hashes.join(","));
      console.log("found hash successfully")
      break;
    }
  }
}

calc();