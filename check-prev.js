const fs = require('fs');

var pattern = "01111110101101001001100101100011110001111001010001100000000010110100100001000110110000101111100000001101100001000010111110101101000010001011010110010110101100000011111001100110000101110101100101110011011100110000100110010000101010010001110001101110110111010000111000000111111000101001010001110110011101101101011001010100011000101011011101110010100110111010011110111101100011100011011100001101001100100001100100001000111100000100110011001000111011111110011001010111000110111111011111100001000001110011000110101100111011101011010110110000000000011001101000101010110111110111111001011001111011100011001000011111000000111011010000111010110000000000000101010110111110001110001100010110011000010100111001010100011100100000000110000100001110101011101101000100010011011001011";
var accResult = "";

var config = {
  baseBet: { label: "base bet", value: 3, type: "number" },
  payout: { label: "payout", value: 2, type: "number" },
  invalidBetAmount: { label: "invalid bet amount", value: 0, type: "number" },
  prevCheck: { label: "prev check", value: 5, type: "number" },
  countDiff: { label: "count diff", value: 11, type: "number" },
  observationCount: { label: "observation count", value: 1000, type: "number"},
  predictCount: { label: "prediction count", value: 1000, type: "number"},
};

const readPattern = () => {
  return new Promise(resolve => {
    // fs.readFile('./temp.txt', 'utf8', (err, data) => {
    // fs.readFile('./pattern.txt', 'utf8', (err, data) => {
    fs.readFile('./last1000000.txt', 'utf8', (err, data) => {
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

const getLastResult = (currentIndex) => {
  return accResult.slice(accResult.length - config.prevCheck.value, accResult.length)
}

let occurData = {};

const main = async (balance, startPoint = 10000) => {
  pattern = await readPattern();
  accResult = pattern.slice(startPoint, startPoint + config.observationCount.value);
  occurData = {}

  var currentBet = config.invalidBetAmount.value;

  var i = 0;
  var payout = 0;
  var lastResult = "";
  var countOf0 = 0;
  var countOf1 = 0;
  var logs = "";
  var prevBalance = balance;
  
  // for (i = startPoint + config.observationCount.value; i < startPoint + config.observationCount.value + config.predictCount.value; i++) {
  for (i = startPoint + config.observationCount.value; i < pattern.length; i++) {
    payout = pattern[i];
    if (currentBet > config.invalidBetAmount.value) {
      if (payout == "1" ) {
        if (countOf1 > countOf0) {
          balance -= currentBet;
          if (!(lastResult in occurData))
            occurData[lastResult] = 0;
          logs += "fail: " + payout + ", " + lastResult + ": " + occurData[lastResult] + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", balance: " + balance + ", index: " + i + "\r\n";
          // console.log("fail: " + payout + ", " + lastResult + ": " + occurData[lastResult]);
        } else {
          balance += currentBet;
          logs += "success: " + payout + ", " + lastResult + ": " + occurData[lastResult] + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", balance: " + balance + ", index: " + i + "\r\n";
          // console.log("success: " + payout + ", " + lastResult + ": " + occurData[lastResult]);
          occurData[lastResult] = 0;
        }
      } else {
        if (countOf1 > countOf0) {
          balance += currentBet * 0.96;
          logs += "success: " + payout + ", " + lastResult + ": " + occurData[lastResult] + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", balance: " + balance + ", index: " + i + "\r\n";
          // console.log("success: " + payout + ", " + lastResult + ": " + occurData[lastResult]);
          occurData[lastResult] = 0;
        } else {
          balance -= currentBet;
          if (!(lastResult in occurData))
            occurData[lastResult] = 0;
          logs += "fail: " + payout + ", " + lastResult + ": " + occurData[lastResult] + ", countOf1: " + countOf1 + ", countOf0: " + countOf0 + ", balance: " + balance + ", index: " + i + "\r\n";
          // console.log("fail: " + payout + ", " + lastResult + ": " + occurData[lastResult]);
        }
      }
    }

    if (balance < 0) {
      balance += currentBet;
      break;
    }

    if (Math.abs(balance - prevBalance) > 500) {
      break;
    }

    // accResult = accResult.substring(1);
    accResult += payout;
    lastResult = getLastResult(i);
    countOf0 = occurrences(lastResult + "0", true);
    countOf1 = occurrences(lastResult + "1", true);

    if (Math.abs(countOf1 - countOf0) > config.countDiff.value) {
      if (!(lastResult in occurData)) {
        occurData[lastResult] = 0;
      }
      occurData[lastResult] = occurData[lastResult] + 1;
      // if (occurData[lastResult] > 3) {
      //   occurData[lastResult] = 0;
      // }
      currentBet = config.baseBet.value * Math.pow(2, occurData[lastResult]);
      // currentBet = config.baseBet.value * occurData[lastResult];

      if (currentBet > balance) {
        break;
      }
    } else {
      currentBet = config.invalidBetAmount.value;
    }
  }

  console.log("final balance: ", balance, " overall count:",  i);

  fs.writeFile("./result.txt", logs, function (err) {
    if (err) {
      return console.log(err);
    }
  });

  return {balance, i};
}

var binaries = [];

// Function to generate all binary strings
function generateAllBinaryStrings(n, arr, i)
{
    if (i == n)
    {
        binaries.push(arr.join(""));
        return;
    }

    // First assign "0" at ith position
    // and try for all other permutations
    // for remaining positions
    arr[i] = 0;
    generateAllBinaryStrings(n, arr, i + 1);

    // And then assign "1" at ith position
    // and try for all other permutations
    // for remaining positions
    arr[i] = 1;
    generateAllBinaryStrings(n, arr, i + 1);
}

const checkBinary = async () => {
  pattern = await readPattern();
  var j = 0;

  for (j = 1; j < 10; j++) {
    let arr = new Array(j);
    arr.fill(0);
    generateAllBinaryStrings(j, arr, 0);
  }
  accResult = pattern;
  occurData = {}

  var i = 0;
  var logs = "";

  for (i = 0; i < binaries.length; i++) {
    var count = occurrences(binaries[i], true);
    logs += binaries[i] + "-" + count + "\r\n"
  }

  fs.writeFile("./result.txt", logs, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

const loopAll = async () => {
  let total = 0;
  let result = {
    balance: 1000,
    i: 100000
  }
  for (j = 0; j < 20; j++) {
    result = await main(1000, result["i"] + 1)
    total += (result["balance"] - 1000)
  }

  console.log(total)
}

loopAll()
// main(1000, 101000)
// checkBinary()