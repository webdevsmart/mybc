const fs = require('fs');

var pattern = "01111110101101001001100101100011110001111001010001100000000010110100100001000110110000101111100000001101100001000010111110101101000010001011010110010110101100000011111001100110000101110101100101110011011100110000100110010000101010010001110001101110110111010000111000000111111000101001010001110110011101101101011001010100011000101011011101110010100110111010011110111101100011100011011100001101001100100001100100001000111100000100110011001000111011111110011001010111000110111111011111100001000001110011000110101100111011101011010110110000000000011001101000101010110111110111111001011001111011100011001000011111000000111011010000111010110000000000000101010110111110001110001100010110011000010100111001010100011100100000000110000100001110101011101101000100010011011001011";

var config = {
  baseBet: { label: "base bet", value: 5, type: "number" },
  payout: { label: "payout", value: 2, type: "number" },
  invalidBetAmount: { label: "bet Amount of continouse 0", value: 0.00001, type: "number" },
};

var max_x_limit = 3;
var initialAsset = 10000.0;

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

const main = async (balance, startPoint = 0) => {
  var currentBet = config.invalidBetAmount.value;
  var lastx = ["0", "0", "0", "0", "0"];
  var i = 0;
  var payout = 0;
  var xxx = 1;
  var max_xxx = 1;
  var laststr = "";
  var last1str = "";
  pattern = await readPattern();
  var logs = ""
  
  for (i = startPoint; i < pattern.length; i++) {
    payout = pattern[i];
    lastx.shift();
    lastx.push(payout)

    // console.log(currentBet, "   " + lastx)
    if (balance < 0) {
      console.log("xxx: ", xxx)
      break;
    }

    if (currentBet == config.baseBet.value * xxx) {
      laststr = lastx.join('')
      last1str = lastx.slice(1, 5).join('')
      if (laststr == '10001' || last1str == '1001') {
        balance += currentBet;
        console.log("win! ", balance, ", xxx: ", xxx)
        logs += "win xxx: " + xxx + "\r\n";
        xxx = 1;
        currentBet = config.invalidBetAmount.value;
      } else if (laststr == '01110' || last1str == '0110') {
        balance += currentBet * 0.96;
        console.log("win! ", balance, ", xxx:", xxx)
        logs += "win xxx: " + xxx + "\r\n";
        xxx = 1;
        currentBet = config.invalidBetAmount.value;
      } else {
        balance -= currentBet;
        console.log("lose! ", balance, ", xxx:", xxx)
        logs += "lose xxx: " + xxx + "\r\n";
        xxx *= 2;
        if (xxx > max_xxx)
          max_xxx = xxx
      }

      // lastx = ["0", "0", "0", "0"];
    }

    laststr = lastx.slice(1, 5).join('');
    last1str = lastx.slice(2, 5).join('');
    if (laststr == "1000" || laststr == "0111" || laststr == "100" || laststr == "011") {
      currentBet = config.baseBet.value * xxx;
    } else {
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

main(1000, 990000)