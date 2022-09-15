const data = require('./data-five-million');
const fs = require('fs');

const checkAllUnder = (arr, payout) => {
  let i = 0;

  for (i = 0; i < arr.length; i++) {
    if (arr[i] >= payout)
      return false;
  }
  return true;
}

const calc = (at = 0, length) => {
  let i = 0;
  let dist_2 = 0,
      dist_3 = 0,
      dist_4 = 0,
      dist_5 = 0,
      dist_6 = 0,
      dist_7 = 0,
      dist_8 = 0,
      dist_9 = 0,
      dist_10 = 0,
      dist_11 = 0,
      dist_12 = 0,
      dist_13 = 0,
      dist_14 = 0,
      dist_1 = 0;
  let last_2 = at,
      last_3 = at,
      last_4 = at,
      last_5 = at,
      last_6 = at,
      last_7 = at,
      last_8 = at,
      last_9 = at,
      last_10 = at,
      last_11 = at,
      last_12 = at,
      last_13 = at,
      last_14 = at,
      last_1 = at;
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
    "10x": 0,
    "11x": 0,
    "12x": 0,
    "13x": 0,
    "14x": 0,
  };

  for (i = at; i < at + length; i++) {
    if (data[i] >= 2) {
      if (i - last_2 - 1 > dist_2) {
        dist_2 = i - last_2 - 1;
      }
      last_2 = i;
      freq["2x"]++;
    }
    if (data[i] >= 3) {
      if (i - last_3 - 1 > dist_3) {
        dist_3 = i - last_3 - 1;
      }
      last_3 = i;
      freq["3x"]++;
    }
    if (data[i] >= 4) {
      if (i - last_4 - 1 > dist_4) {
        dist_4 = i - last_4 - 1;
      }
      last_4 = i;
      freq["4x"]++;
    }
    if (data[i] >= 5) {
      if (i - last_5 - 1 > dist_5) {
        dist_5 = i - last_5 - 1;
      }
      last_5 = i;
      freq["5x"]++;
    }
    if (data[i] >= 6) {
      if (i - last_6 - 1 > dist_6) {
        dist_6 = i - last_6 - 1;
      }
      last_6 = i;
      freq["6x"]++;
    }
    if (data[i] >= 7) {
      if (i - last_7 - 1 > dist_7) {
        dist_7 = i - last_7 - 1;
      }
      last_7 = i;
      freq["7x"]++;
    }
    if (data[i] >= 8) {
      if (i - last_8 - 1 > dist_8) {
        dist_8 = i - last_8 - 1;
      }
      last_8 = i;
      freq["8x"]++;
    }
    if (data[i] >= 9) {
      if (i - last_9 - 1 > dist_9) {
        dist_9 = i - last_9 - 1;
      }
      last_9 = i;
      freq["9x"]++;
    }
    if (data[i] >= 10) {
      if (i - last_10 - 1 > dist_10) {
        dist_10 = i - last_10 - 1;
      }
      last_10 = i;
      freq["10x"]++;
    }
    if (data[i] >= 11) {
      if (i - last_11 - 1 > dist_11) {
        dist_12 = i - last_11 - 1;
      }
      last_11 = i;
      freq["11x"]++;
    }
    if (data[i] >= 12) {
      if (i - last_12 - 1 > dist_12) {
        dist_12 = i - last_12 - 1;
      }
      last_12 = i;
      freq["12x"]++;
    }
    if (data[i] >= 13) {
      if (i - last_13 - 1 > dist_13) {
        dist_13 = i - last_13 - 1;
      }
      last_13 = i;
      freq["13x"]++;
    }
    if (data[i] >= 14) {
      if (i - last_14 - 1 > dist_14) {
        dist_14 = i - last_14 - 1;
      }
      last_14 = i;
      freq["14x"]++;
    }
    if (data[i] < 2) {
      if (i - last_1 - 1 > dist_1) {
        dist_1 = i - last_1 - 1;
      }
      last_1 = i;
      freq["1x"]++;
    }
  }

  // console.log("dist 2x: ", dist_2)
  // console.log("dist 3x: ", dist_3)
  // console.log("dist 4x: ", dist_4)
  // console.log("dist 5x: ", dist_5)
  // console.log("dist 6x: ", dist_6)
  // console.log("dist 7x: ", dist_7)
  // console.log("dist 8x: ", dist_8)
  // console.log("dist 9x: ", dist_9)
  // console.log("dist 10x: ", dist_10)
  // console.log("dist 1x: ", dist_1)
  console.log(
    5000000 / freq["1x"],
    5000000 / freq["2x"],
    5000000 / freq["3x"],
    5000000 / freq["4x"],
    5000000 / freq["5x"],
    5000000 / freq["6x"],
    5000000 / freq["7x"],
    5000000 / freq["8x"],
    5000000 / freq["9x"],
    5000000 / freq["10x"],
    5000000 / freq["11x"],
    5000000 / freq["12x"],
    5000000 / freq["13x"],
    5000000 / freq["14x"],
  )
  
  return ({
    "1x": dist_1,
    "2x": dist_2,
    "3x": dist_3,
    "4x": dist_4,
    "5x": dist_5,
    "6x": dist_6,
    "7x": dist_7,
    "8x": dist_8,
    "9x": dist_9,
    "10x": dist_10,
    "11x": dist_11,
    "12x": dist_12,
    "13x": dist_13,
    "14x": dist_14,
  })
}

func = () => {
  let i = 0;
  let logs = "";
  let winCount = 0;
  let failCount = 0;
  let payout = 10;
  let payoutCount = 9;

  for (i = 0; i < data.length; i++) {
    arr = data.slice(i, i + payout * 6)
    if (checkAllUnder(arr, payout) == true) {
      result100 = getDistrubution(i - 100, 100)
      result200 = getDistrubution(i - 200, 100)
      result300 = getDistrubution(i - 300, 100)
      result400 = getDistrubution(i - 400, 100)
      if ((result100[payout + "x"] < payoutCount) && 
        (result200[payout + "x"] < payoutCount) && 
        (result300[payout + "x"] < payoutCount) && 
        (result400[payout + "x"] < payoutCount) 
      ) {
        logs += "[" + (i - 100) + ", " + (i) + ")" + "\r\n";
        logs += JSON.stringify(result100) + "\r\n";
        logs += "[" + (i - 200) + ", " + (i - 100) + ")" + "\r\n";
        logs += JSON.stringify(result200) + "\r\n";
        logs += "[" + (i - 300) + ", " + (i - 200) + ")" + "\r\n";
        logs += JSON.stringify(result300) + "\r\n";
        logs += "[" + (i - 400) + ", " + (i - 300) + ")" + "\r\n";
        logs += JSON.stringify(result400) + "\r\n";
        logs += "\r\n" + "\r\n";
        failCount++;
        i += payout * 5;
      } else {
        winCount++;
      }
    }
  }
  console.log(winCount, failCount)
  fs.writeFile("./freq.txt", logs, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

getDistrubution = (from, length) => {
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
  
  for (j = from; j < from + length; j++) {
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

  return ({
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
}

calcDistribution = (dist, from, length) => {
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
  let logs = "";

  for (i = 0; i < length / dist; i++) {
    for (j = from + i * dist; j < from + (i + 1) * dist; j++) {
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
    logs += "[" + (from + i * dist) + ", " + (from + (i + 1) * dist) + ")" + "\r\n";
    logs += "\t1x: " + freq_1 + "\r\n";
    logs += "\t2x: " + freq_2 + "\r\n";
    logs += "\t3x: " + freq_3 + "\r\n";
    logs += "\t4x: " + freq_4 + "\r\n";
    logs += "\t5x: " + freq_5 + "\r\n";
    logs += "\t6x: " + freq_6 + "\r\n";
    logs += "\t7x: " + freq_7 + "\r\n";
    logs += "\t8x: " + freq_8 + "\r\n";
    logs += "\t9x: " + freq_9 + "\r\n";
    logs += "\t10x: " + freq_10 + "\r\n";

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

  fs.writeFile("./freq.txt", logs, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

const getProb = (length) => {
  let i = 0;
  for (i = 2; i < length; i++) {
    console.log(Math.pow(10, 9) / ((99 / i) * Math.pow(10, 9) + 1) * 100)
  }
};

calc(0, data.length);
// getProb(20);
// calcDistribution(100, 50000, 4000000)
// func()

// {
//   '1x': 2524468,
//   '2x': 2475532,
//   '3x': 1650863,
//   '4x': 1237989,
//   '5x': 990576,
//   '6x': 825487,
//   '7x': 707464,
//   '8x': 619136,
//   '9x': 550540,
//   '10x': 495600
// }

// 1.9806153217232303 2.0197678721179932 3.0287189185292784 4.03880809926421 5.04756828350374 6.057030577101759 7.067497427430936 8.075770105437254 9.081992225814655 10.088781275221953