
var CryptoJS = require("crypto-js");
var axios = require('axios');
var fs = require('fs');

const gameResult = (seed, salt) => {
  const nBits = 52; // number of most significant bits to use

  // 1. HMAC_SHA256(message=seed, key=salt)
  if (salt) {
    const hmac = CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(seed), salt);
    seed = hmac.toString(CryptoJS.enc.Hex);
  }

  // 2. r = 52 most significant bits
  seed = seed.slice(0, nBits / 4);
  const r = parseInt(seed, 16);

  // 3. X = r / 2^52
  let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)
  X = parseFloat(X.toPrecision(9));

  // 4. X = 99 / (1-X)
  X = 99 / (1 - X);

  // 5. return max(trunc(X), 100)
  const result = Math.floor(X);
  return Math.max(1, result / 100);
};

const salt = "0000000000000000000e3a66df611d6935b30632f352e4934c21059696117f28";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const get_all_bet_data = async (init_game_id, count) => {
  let logs = ""
  let game_id = await get_current_game_id(init_game_id);

  const res = await axios.get("https://bc.game/api/game/support/bet-log/all-bet/crash/" + game_id + "/")
  const response = JSON.parse(JSON.stringify(res.data));

  console.log('---------------------\nGameID', game_id)
  let game_hash = response['data']['gb']['extend']['hash']
  let prevHash = null;
  for (let i = 0; i < count; i++) {
    let hash = String(prevHash ? CryptoJS.SHA256(String(prevHash)) : game_hash);
    let bust = gameResult(hash, salt)
    if (bust < 2) {
      logs = "0" + logs
    } else {
      logs = "1" + logs
    }

    game_id -= 1
    prevHash = hash;
  }

  fs.writeFile("./last100000.txt", logs, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

const get_current_game_id = async (id) => {
  while (1) {
    const res = await axios.get("https://bc.game/api/game/support/bet-log/all-bet/crash/" + id + "/")
    const response = JSON.parse(JSON.stringify(res.data));
    if (response['data'] == null) {
      id -= 1
      break
    } else {
      id += 1
      console.log(id)
    }
  }
  return id;
}

let game_id = 0;

const getLastGameID = async () => {
  while (true) {
    try {
      const res = await axios.post("https://bc.game/api/crash/result/recent/")
      game_id = res.data.data[0].gameId;
      break
    } catch (e) {
      continue;
    }
  }
}

getLastGameID().then(res => {
  get_all_bet_data(game_id, 100000);
})
