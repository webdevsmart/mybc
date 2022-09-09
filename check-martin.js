const data = require('./data-five-million');
const prob = {
  "1x": 1.9806153217232303,
  "2x": 2.0197678721179932,
  "3x": 3.0287189185292784,
  "4x": 4.03880809926421,
  "5x": 5.04756828350374,
  "6x": 6.057030577101759,
  "7x": 7.067497427430936,
  "8x": 8.075770105437254,
  "9x": 9.081992225814655,
  "10x": 10.088781275221953
}

const checkLast = (index) => {
  const start = index - 100 < 0 ? 0 : index - 100;
  let i = 0, count = 0;

  for (i = start; i < index; i++) {
    if (data[i] > 10) {
      count++;
    }
  }

  return count;
}

const calc = (at = 0, length) => {
  let i = 0;
  let balance = 1000;
  let amount = 10;
  let prevIndex = 0;
  
  for (i = at; i < at + length; i++) {
    if (checkLast(i) < 10) {
      if (i - prevIndex < 5) {
        balance -= amount;
        if (balance < 0) {
          console.log("minus balance")
        }
        if (data[i] >= 10) {
          balance += amount * 10;
        }
      }
    }
    console.log(balance)
  
    if (data[i] > 10) {
      prevIndex = i;
    }
  }

  console.log(balance)
}

const calc1 = (at = 0, length) => {
  let i = 0;
  let balance = 1000;
  let amount = 5;
  let payout = 1.5;
  
  for (i = at; i < at + length; i++) {
    balance -= amount
    if (data[i] >= 1.5) {
      balance += amount * 1.5
      if (amount == 0)
        amount = 10
      else
        amount = 5;
    } else {
      amount = 0;
    }

    if (balance < 0)
      console.log("minus balance")

    console.log(balance)
  }

  console.log(balance)
}

const getPayout = (at, dist, freqCount, showlog = false) => {
  let freq_1 = 0,
      freq_2 = 0,
      freq_3 = 0,
      freq_4 = 0,
      freq_5 = 0,
      freq_6 = 0,
      freq_7 = 0,
      freq_8 = 0,
      freq_9 = 0,
      freq_10 = 0;
  // let logs = "";
  at = at - dist * freqCount;
  let arrResult = [];

  for (i = 0; i < freqCount; i++) {
    for (j = at + i * dist; j < at + (i + 1) * dist; j++) {
      if (data[j] < 2) {
        freq_1++;
      }
      if (data[j] >= 2) {
        freq_2++;
      }
      if (data[j] >= 3) {
        freq_3++;
      }
      if (data[j] >= 4) {
        freq_4++;
      }
      if (data[j] >= 5) {
        freq_5++;
      }
      if (data[j] >= 6) {
        freq_6++;
      }
      if (data[j] >= 7) {
        freq_7++;
      }
      if (data[j] >= 8) {
        freq_8++;
      }
      if (data[j] >= 9) {
        freq_9++;
      }
      if (data[j] >= 10) {
        freq_10++;
      }
    }
    // logs += "[" + (from + i * dist) + ", " + (from + (i + 1) * dist) + ")" + "\r\n";
    // logs += "\t1x: " + freq_1 + "\r\n";
    // logs += "\t2x: " + freq_2 + "\r\n";
    // logs += "\t3x: " + freq_3 + "\r\n";
    // logs += "\t4x: " + freq_4 + "\r\n";
    // logs += "\t5x: " + freq_5 + "\r\n";
    // logs += "\t6x: " + freq_6 + "\r\n";
    // logs += "\t7x: " + freq_7 + "\r\n";
    // logs += "\t8x: " + freq_8 + "\r\n";
    // logs += "\t9x: " + freq_9 + "\r\n";
    // logs += "\t10x: " + freq_10 + "\r\n";

    arrResult.push({
      "1x": freq_1,
      "2x": freq_2,
      "3x": freq_3,
      "4x": freq_4,
      "5x": freq_5,
      "6x": freq_6,
      "7x": freq_7,
      "8x": freq_8,
      "9x": freq_9,
      "10x": freq_10,
    })
    freq_1 = 0;
    freq_2 = 0;
    freq_3 = 0;
    freq_4 = 0;
    freq_5 = 0;
    freq_6 = 0;
    freq_7 = 0;
    freq_8 = 0;
    freq_9 = 0;
    freq_10 = 0;
  }
  if (showlog)
    console.log(arrResult, data[at + dist * freqCount])

  for (i = 0; i < freqCount; i++) {
    if (arrResult[i]["10x"] >= parseInt(dist / 10) - 1)
      break;
  }
  if (i == freqCount) {
    return 10;
  }
  
  for (j = 9; j > 2; j--) {
    for (i = 0; i < freqCount; i++) {
      if (arrResult[i][j + "x"] >= parseInt(dist / j) -  2)
        break;
    }
    if (i == freqCount) {
      return j;
    }
  }

  for (i = 0; i < freqCount; i++) {
    if (arrResult[i]["2x"] >= parseInt(dist / 2) - 2)
      break;
  }
  if (i == freqCount) {
    return 2;
  }

  for (i = 0; i < freqCount; i++) {
    if (arrResult[i]["1x"] >= parseInt(dist / 2) - 1)
      break;
  }
  if (i == freqCount) {
    return 1;
  }

  return 0;
  // fs.writeFile("./freq.txt", logs, function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  // });
}

const getFreq = (at, dist) => {
  let freq = {
    "1x": 0,
    "2x": 0,
    "3x": 0,
    "4x": 0,
    "5x": 0,
    "6x": 0,
    "7x": 0,
    "8x": 0,
    "9x": 0,
    "10x": 0
  };
  let i = 0, j = 0;

  for (j = at - dist; j < at; j++) {
    if (data[j] < 2) {
      freq["1x"]++;
    }
    if (data[j] >= 2) {
      freq["2x"]++;
    }
    if (data[j] >= 3) {
      freq["3x"]++;
    }
    if (data[j] >= 4) {
      freq["4x"]++;
    }
    if (data[j] >= 5) {
      freq["5x"]++;
    }
    if (data[j] >= 6) {
      freq["6x"]++;
    }
    if (data[j] >= 7) {
      freq["7x"]++;
    }
    if (data[j] >= 8) {
      freq["8x"]++;
    }
    if (data[j] >= 9) {
      freq["9x"]++;
    }
    if (data[j] >= 10) {
      freq["10x"]++;
    }
    // logs += "[" + (from + i * dist) + ", " + (from + (i + 1) * dist) + ")" + "\r\n";
    // logs += "\t1x: " + freq_1 + "\r\n";
    // logs += "\t2x: " + freq_2 + "\r\n";
    // logs += "\t3x: " + freq_3 + "\r\n";
    // logs += "\t4x: " + freq_4 + "\r\n";
    // logs += "\t5x: " + freq_5 + "\r\n";
    // logs += "\t6x: " + freq_6 + "\r\n";
    // logs += "\t7x: " + freq_7 + "\r\n";
    // logs += "\t8x: " + freq_8 + "\r\n";
    // logs += "\t9x: " + freq_9 + "\r\n";
    // logs += "\t10x: " + freq_10 + "\r\n";
  }

  return freq;
}

const getPayout2 = (at, showlog = false) => {
  // let logs = "";
  let i = 0, j = 0;
  let arrDist = ["100", "200", "400", "800"];
  let arrFreq = {};
  let payout = 1;

  for (j = 0; j < arrDist.length; j++) {
    arrFreq[arrDist[j]] = getFreq(at - parseInt(arrDist[j]) / 2, parseInt(arrDist[j]));
  }

  let temp = 1000000, sum = 0;
  for (i = 2; i <= 10; i+=2) {
    sum = 0;
    for (j = 0; j < arrDist.length; j++) {
      sum += arrFreq[arrDist[j]][i + "x"] * prob[i + "x"] / arrDist[j]
    }
    if (temp > sum) {
      temp = sum;
      payout = i;
    }
  }
  sum = 0;
  for (j = 0; j < arrDist.length; j++) {
    sum += arrFreq[arrDist[j]]["1x"] * prob["1x"] / arrDist[j]
  }
  if (temp > sum) {
    temp = sum;
    payout = 1;
  }
  return payout;
  // fs.writeFile("./freq.txt", logs, function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  // });
}

const calc3 = (at = 0, length) => {
  let i = 0;
  let balance = 3000;
  let amount = 0.1;
  let prevIndex = at;
  let xxx = 1;
  let max_xxx = 1;
  let payout = 0;
  
  for (i = at; i < data.length; i++) {
    if (payout > 0) {
      balance -= amount * xxx;
      if (balance < 0) {
        balance += amount * xxx;
        console.log("minus balance", i)
        break;
      }
    }

    if (payout == 1) {
      if (data[i] < 2) {
        balance += amount * xxx * 1.96;
        xxx = 1;
        prevIndex = i;
        // payout = getPayout(i + 1, 100, 4)
        payout = getPayout2(i + 1, 1000)

        if (i - at > length)
          break;
      }
    } else if (payout > 1) {
      if (data[i] >= payout) {
        balance += amount * xxx * payout;
        xxx = 1;
        prevIndex = i;
        // payout = getPayout(i + 1, 100, 4)
        payout = getPayout2(i + 1, 1000)
  
        if (i - at > length)
          break;
      }
    } else {
      xxx = 1;
      prevIndex = i;
      // payout = getPayout(i + 1, 100, 4)
      payout = getPayout2(i + 1, 1000)
    }

    if (payout == 1) {
      xxx = Math.pow(2, parseInt((i - prevIndex)));
    } else if (payout > 1) {
      xxx = Math.pow(2, parseInt((i - prevIndex) / payout * 2));
    }
    if (max_xxx < xxx)
      max_xxx = xxx;
  }

  console.log("index: " + at + ", balance: " + balance + ", max_xxx: " + max_xxx + ", payout: " + payout)
  return {balance, max_xxx, payout};
}

const calc4 = (at = 0, length) => {
  let i = 0;
  let balance = 3000;
  let amount = 1;
  let prevIndex = at;
  let xxx = 1;
  let max_xxx = 1;
  
  for (i = at; i < data.length; i++) {
    balance -= amount * xxx;
    
    if (balance < 0) {
      console.log("minus balance")
    }

    if (data[i] < 2) {
      balance += amount * xxx * 1.96;
      xxx = 1;
      prevIndex = i;
      
      if (i - at > length)
        break;
    }

    xxx = Math.pow(2, parseInt((i - prevIndex) / 2));
    if (max_xxx < xxx)
      max_xxx = xxx;
  }

  console.log(balance, max_xxx)
}

// calc4(300000, 100000);
// calc3(10000, 100)
let k = 10000, log = "", failCount = 0, winCount = 0, total = 0;
for (k = 10000; k < 4500000; k+=10000) {
  res = calc3(k, 10000)
  // if (res.balance < 0)
  //   break;
  if (res.balance < 3000)
    failCount++;
  else
    winCount++;

  total += res.balance - 3000
}
console.log(winCount, failCount, total)
// getPayout(155164, 100, 10, true)