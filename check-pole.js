const fs = require('fs');

var pattern = "01111110101101001001100101100011110001111001010001100000000010110100100001000110110000101111100000001101100001000010111110101101000010001011010110010110101100000011111001100110000101110101100101110011011100110000100110010000101010010001110001101110110111010000111000000111111000101001010001110110011101101101011001010100011000101011011101110010100110111010011110111101100011100011011100001101001100100001100100001000111100000100110011001000111011111110011001010111000110111111011111100001000001110011000110101100111011101011010110110000000000011001101000101010110111110111111001011001111011100011001000011111000000111011010000111010110000000000000101010110111110001110001100010110011000010100111001010100011100100000000110000100001110101011101101000100010011011001011";
var accResult = "";

var config = {
  baseBet: { label: "base bet", value: 10, type: "number" },
  payout: { label: "payout", value: 2, type: "number" },
  invalidBetAmount: { label: "invalid bet amount", value: 0, type: "number" },
  countDiff: { label: "count diff", value: 17, type: "number" },
  observationCount: { label: "observation count", value: 100, type: "number"},
  profit: { label: "Profit", value: 60, type: "number"},
};

const readPattern = () => {
  return new Promise(resolve => {
    fs.readFile('./temp.txt', 'utf8', (err, data) => {
    // fs.readFile('./pattern.txt', 'utf8', (err, data) => {
    // fs.readFile('./last1000000.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        resolve("");
      }
      resolve(data);
    });
  })
}

function occurrences(subString, allowOverlapping) {
  var n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

  while (true) {
      pos = accResult.indexOf(subString, pos);
      if (pos >= 0) {
          ++n;
          pos += step;
      } else break;
  }
  return n;
}

function occurrencesOfStr(string, subString, allowOverlapping) {
  var n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

  while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
          ++n;
          pos += step;
      } else break;
  }
  return n;
}

let occurData = {};

const checkPole = async (balance, startPoint = 10000) => {
  pattern = await readPattern();
  accResult = pattern.slice(startPoint - config.observationCount.value, startPoint);
  occurData = {}

  var currentBet = config.invalidBetAmount.value;

  var i = 0;
  var prevBalance = balance;
  var payout = 0;
  var countOf0 = 0;
  var countOf1 = 0;
  var logs = "";
  var failed = 0;
  
  for (i = startPoint - config.observationCount.value; i < pattern.length; i++) {
    payout = pattern[i];
    if (currentBet == config.baseBet.value * Math.pow(2, failed)) {
      if (countOf0 > countOf1) {
        if (payout == "0") {
          balance -= currentBet;
        } else {
          balance += currentBet;
        }
      }
      else {
        if (payout == "0") {
          balance += currentBet * 0.96;
        } else {
          balance -= currentBet;
        }
      }

      if (balance < 0) {
        logs += "bet finished: " + i + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", negative balance: " + balance + "\r\n";
        console.log("bet finished: " + i + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", negative balance: " + balance)
        break;
      }

      if (balance - prevBalance > config.profit.value * Math.pow(2, failed)) {
        failed = 0;
        accResult = pattern.slice(i - config.observationCount.value, i);
        countOf0 = occurrences("0");
        countOf1 = occurrences("1");
        
        logs += "bet end: " + i + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", currentBet: " + currentBet + ", balance: " + balance + "\r\n";
        console.log("bet end: " + i + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", currentBet: " + currentBet + ", balance: " + balance)
        
        currentBet = config.invalidBetAmount.value;
      }
      else if (prevBalance - balance > config.profit.value * Math.pow(2, failed)) {
        failed++;
        // if (failed > 3) {
          // failed = 0;
          i += config.observationCount.value
        // }

        accResult = pattern.slice(i - config.observationCount.value, i);
        countOf0 = occurrences("0");
        countOf1 = occurrences("1");

        logs += "bet failed: " + i + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", currentBet: " + currentBet + ", balance: " + balance + "\r\n";
        console.log("bet failed: " + i + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", currentBet: " + currentBet + ", balance: " + balance)

        currentBet = config.invalidBetAmount.value;
      }
    } else {
      accResult = accResult.substring(1);
      accResult += payout;
      countOf0 = occurrences("0");
      countOf1 = occurrences("1");
  
      if (Math.abs(countOf1 - countOf0) > config.countDiff.value) {
        past500 = pattern.slice(i - 1000, i);
        count500Of0 = occurrencesOfStr(past500, "0");
        count500Of1 = occurrencesOfStr(past500, "1");
        // if ((countOf0 > countOf1 && count500Of0 > count500Of1) || (countOf0 < countOf1 && count500Of0 < count500Of1)) {
        //   past500 = pattern.slice(i - 10000, i);
        //   count500Of0 = occurrencesOfStr(past500, "0");
        //   count500Of1 = occurrencesOfStr(past500, "1");

          if ((countOf0 > countOf1 && count500Of0 > count500Of1) || (countOf0 < countOf1 && count500Of0 < count500Of1)) {
            prevBalance = balance;
            currentBet = config.baseBet.value * Math.pow(2, failed);
            logs += "bet start: " + i + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", balance: " + balance + "\r\n";
            console.log("bet start: " + i + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", balance: " + balance)
          }
        // }
      }
    }
  }

  console.log("final balance: ", balance, " overall count:",  i);

  fs.writeFile("./result.txt", logs, function (err) {
    if (err) {
      return console.log(err);
    }
  });

  return balance;
}

// const loopAll = async () => {
//   let total = 0
//   for (j = 0; j < 100; j++) {
//     bal = await main(1000, 100000 + j * config.predictCount.value)
//     total += (bal - 1000)
//   }

//   console.log(total)
// }

// loopAll()
checkPole(1000, 4340000)