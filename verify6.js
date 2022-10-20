const data = require('./data-five-million');

const crashPoints = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
// const crashPoints = [2, 4, 6, 8, 10, 12, 14, 16, 18];

// const getLastGameID = () => {
//   let game_id = 0;
//   while (true) {
//     try {
//       const res = await axios.post("https://bc.game/api/crash/result/recent/")
//       game_id = res.data.data[0].gameId;
//       break
//     } catch (e) {
//       continue;
//     }
//   }
//   return game_id;
// }

// export function gameResult(seed) {
//   const nBits = 52; // number of most significant bits to use

//   // 1. HMAC_SHA256(message=seed, key=salt)
//   if (salt) {
//     const hmac = CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(seed), salt);
//     seed = hmac.toString(CryptoJS.enc.Hex);
//   }

//   // 2. r = 52 most significant bits
//   seed = seed.slice(0, nBits / 4);
//   const r = parseInt(seed, 16);

//   // 3. X = r / 2^52
//   let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)
//   X = parseFloat(X.toPrecision(9));

//   // 4. X = 99 / (1-X)
//   X = 99 / (1 - X);

//   // 5. return max(trunc(X), 100)
//   const result = Math.floor(X);
//   return Math.max(1, result / 100);
// }

// const getPayout = (id) => {
//   try {
//     const res = await axios.get("https://bc.game/api/game/support/bet-log/all-bet/crash/" + game_id + "/")
//     const response = JSON.parse(JSON.stringify(res.data));
//     if (response['data'] == null) {
//         await delay(1000)
//     }
//   } catch (e) {
//     console.log('loading...')
//   }
// }

// getLastGameID().then(id => {
  
// });

const getPayout = (id) => {
  for (let i = 0; i < crashPoints.length; i++) {
    let overCrashPoint = 0;
    let distCrashPoint = [];
    for (let j = id - crashPoints[i] * 100; j < id; j++) {
      if (data[j] >= crashPoints[i]) {
        overCrashPoint++;
        if (distCrashPoint.length == 0) {
          distCrashPoint.push({gid: j, dist: 0});
        } else {
          distCrashPoint.push({
            gid: j,
            dist: j - distCrashPoint[distCrashPoint.length - 1].gid,
          });
        }
      }
    }
    
    // if (overCrashPoint < 99 - 15) {
      let subSum = 0;
      for (j = distCrashPoint.length - 4 ; j < distCrashPoint.length - 1; j++) {
        subSum += distCrashPoint[j].dist;
        if (distCrashPoint[j].dist < crashPoints[i]) {
          break;
        }
      }
      if (j == distCrashPoint.length - 1) {
      // if (j == distCrashPoint.length - 1 && subSum > crashPoints[i] * 4) {
        // console.log(crashPoints[i], overCrashPoint, distCrashPoint)
        return crashPoints[i];
      }
    // }
  }
  return 0;
}

const run = () => {
  let currentId = 1234567;
  let balance = 1000;
  const betAmount = 5;
  while(currentId < 1244567) {
    payout = getPayout(currentId)
    if (payout != 0) {
      console.log("payout: " + payout + ", ID: ", currentId)
      let prevBalance = balance;
      let i = currentId;
      for (i = currentId; i  < currentId + payout; i++) {
        balance -= betAmount;
        if (balance < 0) {
          console.log("negative!!")
        }
        if (data[i] >= payout) {
          balance += betAmount * payout;
        }
        // if (balance - prevBalance >= betAmount * payout * 10) {
        //   break;
        // }
      }
      currentId = i + 1;
      // if (prevBalance > balance) {
      //   prevBalance = balance;
      //   for (i = currentId; i  < currentId + payout * 5; i++) {
      //     balance -= betAmount;
      //     if (balance < 0) {
      //       console.log("negative!!")
      //     }
      //     if (data[i] >= payout) {
      //       balance += betAmount * payout;
      //     }
      //     if (balance - prevBalance >= betAmount * payout * 7) {
      //       break;
      //     }
      //   }
      // }
      // currentId = i + 1;
      console.log("balance: ", balance)
    }
    currentId++;
  }
  console.log("final balance: ", balance)
}

const getStatus = (from, to) => {
  const overCrashPoints = [];
  let i = 0, j= 0 ;
  for (i = 0; i < crashPoints[i]; i++) {
    overCrashPoints.push(0)
  }
  for (j = from; j < to; j++) {
    for (i = 0; i < crashPoints[i]; i++) {
      if (data[j] >= crashPoints[i]) {
        overCrashPoints[i]++;
      }
    }
  }
  for (i = 0; i < crashPoints[i]; i++) {
    console.log(crashPoints[i] + "-" + overCrashPoints[i])
  }
}

run()
// for (let i = 2000000; i < 3000000; i += 100000) {
//   console.log("-----------")
//   console.log("from: " + i, "to: " + (i + 100000))
//   getStatus(i, i + 100000);
// }