var CryptoJS = require("crypto-js");
var axios = require('axios');

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
let previous = false;
let winCount = 0;
let loseCount = 0;

const checkWinOrLose = (strPattern) => {
    let count = (strPattern.match(/1/g) || []).length;

    let count010 = (strPattern.match(/0[0]+1/g) || []).length;

    return count - count010 > 23;
}

const calc = (pattern) => {
    let subPatterns = pattern.split(/10[0]+10[0]+100/g) || []
    let winCount = 0, loseCount = 0;
    let str = "";

    for (let i = 0; i < subPatterns.length; i++) {
        if (checkWinOrLose(subPatterns[i])) {
            winCount++;
            str += (subPatterns[i].length + "-1\t")
        } else {
            loseCount++;
            str += (subPatterns[i].length + "-0\t")
        }
    }
    console.log(str);
    console.log("Win Count: ", winCount)
    console.log("Lose Count: ", loseCount)
}

const getPastResults = async (init_game_id, count = 1) => {
    while (true) {
        let logs = []
        let game_id = init_game_id
        let pattern = ""
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
                        if (!previous) {
                            loseCount += 1;
                        } else {
                            winCount = 0;
                            loseCount = 1;
                        }
                        previous = false;
                        console.log(bust, 'red', loseCount)

                    } else {
                        if (previous) {
                            winCount += 1;
                        } else {
                            winCount = 1;
                            loseCount = 0;
                        }
                        previous = true;
                        if (bust < 10) console.log(bust, 'green', winCount)
                        else console.log(bust, 'moon', winCount)
                    }
                }
                logs.push({game_id, bust})
                game_id -= 1
                prevHash = hash;
            }
            init_game_id += 1
            let last_2x = 0,
                last_1_2x = 0,
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
                last_100x = 0,
                last_1000x = 0,
                last_10000x = 0;

            let last_1_2x_dist = [];
            let last_10x_dist = [];
            let last_100x_dist = [];
            let last_1000x_dist = [];
            let last_10000x_dist = [];

            let max_10x_dist = 0;
            let max_100x_dist = 0;
            let max_1000x_dist = 0;
            let max_10000x_dist = 0;

            for (let idx = 0; idx < logs.length; idx++) {
                let log = logs[idx]
                let gid = log['game_id']
                let bust = log['bust']
                pattern = (bust < 2 ? "0" : "1") + pattern
                if (idx < 100) {
                    if (bust < 2) {
                        if (bust < 1.2) {
                            last_1_2x += 1
                            let dist = 0;
                            if (last_1_2x_dist.length > 0) {
                                dist = last_1_2x_dist[last_1_2x_dist.length - 1].gid - gid
                            } else {
                                dist = init_game_id - gid
                            }
                            last_1_2x_dist.push({gid, bust, dist})
                        }
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
                    } 
                }
                if(bust >= 10){
                    last_10x_over += 1
                    if(idx < 100) {
                        last_2x_over += 1
                    }
                    let dist = 0;
                    if (last_10x_dist.length > 0) {
                        dist = last_10x_dist[last_10x_dist.length - 1].gid - gid
                    } else {
                        dist = init_game_id - gid
                    }
                    max_10x_dist = Math.max(max_10x_dist, dist)
                    last_10x_dist.push({gid, bust, dist})
                }
                if (bust >= 100) {
                    last_100x += 1
                    let dist = 0
                    if (last_100x_dist.length > 0) {
                        dist = last_100x_dist[last_100x_dist.length - 1].gid - gid
                    } else {
                        dist = init_game_id - gid
                    }
                    last_100x_dist.push({gid, bust, dist})
                    max_100x_dist = Math.max(max_100x_dist, dist)
                }
                if (bust >= 1000) {
                    last_1000x += 1
                    let dist = 0
                    if (last_1000x_dist.length > 0) {
                        dist = last_1000x_dist[last_1000x_dist.length - 1].gid - gid
                    } else {
                        dist = init_game_id - gid
                    }
                    last_1000x_dist.push({gid, bust, dist})
                    max_1000x_dist = Math.max(max_1000x_dist, dist)
                }
                if (bust >= 10000) {
                    last_10000x += 1
                    let dist = 0
                    if (last_10000x_dist.length > 0) {
                        dist = last_10000x_dist[last_10000x_dist.length - 1].gid - gid
                    } else {
                        dist = init_game_id - gid
                    }
                    last_10000x_dist.push({gid, bust, dist})
                    max_10000x_dist = Math.max(max_10000x_dist, dist)
                }
            }
            console.log('10000x', last_10000x_dist.slice(0, 10))
            console.log('1000x', last_1000x_dist.slice(0, 10))
            console.log('100x', last_100x_dist.slice(0, 10))
            console.log('10x', last_10x_dist.slice(0, 10))
            // console.log('1.2x', last_1_2x_dist)
            console.log(
                // 'x < 1.2 \t ==>', last_1_2x,
                '\nx < 2 \t\t ==>', last_2x,
                '\nx >= 2 \t\t ==>', last_2x_over,
                // '\n2 <= x < 3 \t ==>', last_3x,
                // '\n3 <= x < 4 \t ==>', last_4x,
                // '\n4 <= x < 5 \t ==>', last_5x,
                // '\n5 <= x < 6 \t ==>', last_6x,
                // '\n6 <= x < 7 \t ==>', last_7x,
                // '\n7 <= x < 8 \t ==>', last_8x,
                // '\n8 <= x < 9 \t ==>', last_9x,
                // '\n9 <= x <10 \t ==>', last_10x,
                '\n10 <= x \t ==>', last_10x_over,
                '\n100 <= x \t ==>', last_100x,
                '\n1000 <= x \t ==>', last_1000x,
                '\n10000 <= x \t ==>', last_10000x,
                '\n10x ', max_10x_dist,' 100x ', max_100x_dist,' 1000x ', max_1000x_dist,' 10000x ', max_10000x_dist,
            )
            // calc(pattern)
        } catch (e) {
            game_id = init_game_id
            console.log('loading...')
        }
        await delay(300)
    }
}

let game_id = 5061009

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
    while(true) {
        try {
            const res = await axios.post("https://bc.game/api/crash/result/recent/")
            game_id = res.data.data[0].gameId;
            break
        } catch (e) {
            continue;
        }
    }

}
getLastGameID().then(_ => {
    get_current_game_id().then(_ => {
        getPastResults(game_id, 100000).then(null)
    })
});
