
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

const salt = "000000000000000000030587dd9ded1fcc5d603652da58deb670319bd2e09445";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPastResults = async (init_game_id, count = 1) => {
    while (true) {
        let logs = []
        let game_id = init_game_id
        try {
            const res = await axios.get("https://bc.game/api/game/support/bet-log/all-bet/crash/" + game_id + "/")
            const response = JSON.parse(JSON.stringify(res.data));
            if (response['data'] == null) {
                await delay(1000)
                continue
            }
            console.log('---------------------\nGameID', game_id)
            let game_hash = response['data']['gb']['extend']['hash']
            let prevHash = null;
            for (let i = 0; i < count; i++) {
                let hash = String(prevHash ? CryptoJS.SHA256(String(prevHash)) : game_hash);
                if (game_id in logs) {
                    break
                }
                let bust = gameResult(hash, salt)
                if (i == 0) {
                    if (bust < 2) {
                        console.log(bust, 'red')
                    } else if (bust < 10) console.log(bust, 'green')
                    else console.log(bust, 'moon')
                }
                logs.push({ game_id, bust })
                game_id -= 1
                prevHash = hash;
            }
            console.log(prevHash)
            init_game_id += 1
            let last_2x = 0,
                last_2x_over = 0,
                last_3x = 0,
                last_4x = 0,
                last_5x = 0,
                last_6x = 0,
                last_7x = 0,
                last_8x = 0,
                last_9x = 0,
                last_10x = 0,
                last_10x_over = 0,
                last_100x = 0;
            last_1000x = 0;
            let last_100x_dist = [];
            for (let idx = 0; idx < logs.length; idx++) {
                let log = logs[idx]
                let gid = log['game_id']
                let bust = log['bust']
                if (idx < 100) {
                    if (bust < 2) {
                        last_2x += 1
                    } else if (bust < 3) {
                        last_3x += 1
                        last_2x_over += 1
                    } else if (bust < 4) {
                        last_4x += 1
                        last_2x_over += 1
                    } else if (bust < 5) {
                        last_5x += 1
                        last_2x_over += 1
                    } else if (bust < 6) {
                        last_6x += 1
                        last_2x_over += 1
                    } else if (bust < 7) {
                        last_7x += 1
                        last_2x_over += 1
                    } else if (bust < 8) {
                        last_8x += 1
                        last_2x_over += 1
                    } else if (bust < 9) {
                        last_9x += 1
                        last_2x_over += 1
                    } else if (bust < 10) {
                        last_10x += 1
                        last_2x_over += 1
                    } else if (bust < 100) {
                        last_10x_over += 1
                        last_2x_over += 1
                    }
                }
                if (bust >= 100) {
                    if (idx < 100)
                        last_2x_over += 1
                    last_100x += 1
                    let dist = 0
                    if (last_100x_dist.length > 0) {
                        dist = last_100x_dist[last_100x_dist.length - 1].gid - gid
                    } else {
                        dist = init_game_id - gid
                    }
                    last_100x_dist.push({ 'gid': gid, dist: dist })
                }
                if (bust >= 1000) {
                    last_1000x += 1
                }
            }
            console.log('100x', last_100x_dist)
            console.log(
                'x < 2 \t\t ==>', last_2x,
                '\nx >= 2 \t\t ==>', last_2x_over,
                '\n2 <= x < 3 \t ==>', last_3x,
                '\n3 <= x < 4 \t ==>', last_4x,
                '\n4 <= x < 5 \t ==>', last_5x,
                '\n5 <= x < 6 \t ==>', last_6x,
                '\n6 <= x < 7 \t ==>', last_7x,
                '\n7 <= x < 8 \t ==>', last_8x,
                '\n8 <= x < 9 \t ==>', last_9x,
                '\n9 <= x <10 \t ==>', last_10x,
                '\n10 <= x \t ==>', last_10x_over,
                '\n100 <= x \t ==>', last_100x,
                '\n1000 <= x \t ==>', last_1000x,
            )
        } catch (e) {
            game_id = init_game_id
            console.log('err', e)
        }
        await delay(1000)
    }
}

let game_id = 5066704
const get_current_game_id = async () => {
    while (1) {
        const res = await axios.get("https://bc.game/api/game/support/bet-log/all-bet/crash/" + game_id + "/")
        const response = JSON.parse(JSON.stringify(res.data));
        if (response['data'] == null) {
            game_id -= 1
            break
        } else {
            game_id += 1
            console.log(game_id)
        }
    }
}

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
    getPastResults(game_id, 2000).then(null)
})

const get_all_bet_data = async (init_game_id, count) => {
    let logs = ""
    let game_id = init_game_id

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
        console.log(i)
    }

    fs.writeFile("./temp.txt", logs, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}


// get_all_bet_data(game_id, game_id);