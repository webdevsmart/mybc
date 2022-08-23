const fs = require('fs');

var pattern = "01111110101101001001100101100011110001111001010001100000000010110100100001000110110000101111100000001101100001000010111110101101000010001011010110010110101100000011111001100110000101110101100101110011011100110000100110010000101010010001110001101110110111010000111000000111111000101001010001110110011101101101011001010100011000101011011101110010100110111010011110111101100011100011011100001101001100100001100100001000111100000100110011001000111011111110011001010111000110111111011111100001000001110011000110101100111011101011010110110000000000011001101000101010110111110111111001011001111011100011001000011111000000111011010000111010110000000000000101010110111110001110001100010110011000010100111001010100011100100000000110000100001110101011101101000100010011011001011";

var config = {
  baseBet: { label: "base bet", value: 0.1, type: "number" },
  payout: { label: "payout", value: 2, type: "number" },
  invalidBetAmount: { label: "bet Amount of continouse 0", value: 0.00001, type: "number" },
};

var max_x_limit = 4;
var initialAsset = 10000.0;

const readPattern = () => {
  return new Promise(resolve => {
    // fs.readFile('./temp.txt', 'utf8', (err, data) => {
    // fs.readFile('./pattern.txt', 'utf8', (err, data) => {
    fs.readFile('./last10000.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        resolve("");
      }
      resolve(data);
    });
  })
}

const main = async (balance) => {
  var currentBet = config.baseBet.value;
  var lastx = [];
  var i = 0;
  var payout = 0;
  var xxx = 1;
  var max_xxx = 1;
  pattern = await readPattern();
  
  for (i=0; i < pattern.length; i++) {
    payout = pattern[i];
    lastx.push(payout)

    if (balance < 0) {
      console.log("xxx: ", xxx)
      break;
    }

    if (payout === '1') {
      balance += currentBet * xxx;
    } else {
      balance -= currentBet * xxx;
    }
    console.log(balance)

    if (lastx.length === 5) {
      if ((lastx.join("").match(/1/g) || []).length > 2)
        xxx = 1;
      else
        xxx *= 2;
      
      lastx = [];
    }
  }

  console.log("final balance: ", balance, " overall count:",  i, " max xxx:", max_xxx)
}

main(860)

// for (let i = 0; i < 1000; i++) {
//   verify(i)
// }

// function randomDigit() {
//   return (Math.random()>=0.5) ? '1' : '0';
// }

// function generateRandomBinary(binaryLength) {
//   let binary = "0b";
//   for(let i = 0; i < binaryLength; ++i) {
//     binary += randomDigit();
//   }
//   return binary;
// }

// function verify(startPoint) {
//   let sameCount = 0, diffCount = 0;
//   for (let i = startPoint + 0; i < startPoint + 100; i++) {
//     rand = randomDigit();

//     if (pattern[i] == rand) {
//       sameCount++;
//     } else {
//       diffCount++;
//     }
//   }

//   console.log("same: ", sameCount);
//   console.log("diff: ", diffCount);
// }