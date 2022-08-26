const fs = require('fs');

var pattern = "0111111010110100100110010110001111000111100101000110000000001011010010000100011011000010111110000000110110000100001011111010110100001000101101011001011010110000001111100110011000010111010110010111001101110011000010011001000010";

var config = {
  baseBet: { label: "base bet", value: 10, type: "number" },
  payout: { label: "payout", value: 2, type: "number" },
  invalidBetAmount: { label: "bet Amount of continouse 0", value: 0, type: "number" },
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

const main = async (balance, startPoint = 0) => {
  var currentBet = config.invalidBetAmount.value;
  var i = 0;
  var payout = 0;
  var xxx = 1;
  var max_xxx = 1;
  pattern = await readPattern();
  var logs =""
  
  for (i = startPoint; i < pattern.length; i++) {
    payout = pattern[i];

    if (balance < 0) {
      console.log("xxx: ", xxx)
      break;
    }

    if (payout === '0') {
      balance += currentBet * 0.96;
      console.log("win ", balance)
      logs += "win! " + balance + "\r\n";

      if (xxx === 8)
        xxx = 1;
      else
        xxx *= 2;
      
      currentBet = config.baseBet.value * xxx;
    } else {
      balance -= currentBet;
      console.log("lose ", balance)
      logs += "lose! " + balance + "\r\n";
      currentBet = config.invalidBetAmount.value;
    }
  }

  console.log("final balance: ", balance, " overall count:",  i, " max xxx:", max_xxx)
  fs.writeFile("./result.txt", logs, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

main(10000)