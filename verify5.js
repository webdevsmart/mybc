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

const bet1 = (status, payout) => {
  let earning = 0;

  if (payout == "0") {
    if (status == "0") {
      status += "0";
      earning = -config.baseBet.value * 2;
    } else if (status == "1") {
      status = "0";
      earning = -config.baseBet.value;
    } else if (status == "001") {
      status += "0";
      earning = -config.baseBet.value * 4;
    } else if (status == "0010") {
      status += "0";
      earning = -config.baseBet.value * 8;
    }
  } else if (payout == "1") {
    if (status == "0") {
      status = "1";
      earning = config.baseBet.value * 2;
    } else if (status == "1") {
      status = "1";
      earning = config.baseBet.value;
    } else if (status == "00") {
      status += "1";
    } else if (status == "001") {
      status = "1";
      earning = config.baseBet.value * 4;
    } else if (status == "0010") {
      status = "1";
      earning = config.baseBet.value * 8;
    } else if (status == "00100") {
      status = "1";
    }
  }

  return {status, earning}
}

const bet0 = (status, payout) => {
  let earning = 0;

  if (payout == "1") {
    if (status == "1") {
      status += "1";
      earning = -config.baseBet.value * 2;
    } else if (status == "0") {
      status = "0";
      earning = -config.baseBet.value;
    } else if (status == "110") {
      status += "1";
      earning = -config.baseBet.value * 4;
    } else if (status == "1101") {
      status += "1";
      earning = -config.baseBet.value * 8;
    }
  } else if (payout == "0") {
    if (status == "1") {
      status = "0";
      earning = config.baseBet.value * 2 / 2 * 1.96;
    } else if (status == "0") {
      status = "0";
      earning = config.baseBet.value / 2 * 1.96;
    } else if (status == "11") {
      status += "0";
    } else if (status == "110") {
      status = "0";
      earning = config.baseBet.value * 4 / 2 * 1.96;
    } else if (status == "1101") {
      status = "0";
      earning = config.baseBet.value * 8 / 2 * 1.96;
    } else if (status == "11011") {
      status = "0";
    }
  }

  return {status, earning}
}

const main = async (balance, startPoint = 0) => {
  var currentBet = config.invalidBetAmount.value;
  var i = 0;
  var payout = 0;
  pattern = await readPattern();
  var logs = "", status = "1";
  var earning = 0;
  
  for (i = startPoint; i < pattern.length; i++) {
    payout = pattern[i];

    if (balance < 0) {
      break;
    }

    result = bet0(status, payout);

    balance += result.earning;
    status = result.status;
  }

  console.log("final balance: ", balance)
  // fs.writeFile("./result.txt", logs, function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  // });
}

main(1000)