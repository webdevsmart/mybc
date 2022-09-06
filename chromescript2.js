

let stop = false;
const betRed = document.getElementsByClassName("type-200")[0];
const betGreen = document.getElementsByClassName("type200")[0];
const btnDouble = document.getElementsByClassName("button-group")[0].getElementsByTagName("button")[1];
const btnDivideDouble = document.getElementsByClassName("button-group")[0].getElementsByTagName("button")[0];
let myBet = null;

let baseAmount = 3;
let lastx = ["0", "0", "0", "0", "0"];
let payout = 0;
let currentBet = 1;
let xxx = 1;
let laststr = "";

crash.xbet.amount.d = [baseAmount];

myBet = () => {
    crash.waitGameEnd().then(res => {
        payout = res.odds < 2 ? 0 : 1;

        lastx.shift();
        lastx.push(payout.toString())

        console.log('Game end', lastx, ", xxx:", xxx);

        if (currentBet == baseAmount * xxx) {
          laststr = lastx.join('')
          if (laststr == '10001' || laststr == '01110') {
            console.log("win: ", currentBet)
            while(xxx != 1) {
              xxx /= 2;
              btnDivideDouble.click();
            }
            currentBet = 1;
          } else {
            console.log("lose: ", currentBet)
            xxx *= 2;
            if (xxx <= 128)
              btnDouble.click();
            else
              stop = true;
          }
        }

        laststr = lastx.slice(1, 5).join('');
        if (laststr == "1000") {
          currentBet = baseAmount * xxx;
          // crash.xbet.amount.d = [currentBet];
          betGreen.click();
        } else if (laststr == "0111") {
          currentBet = baseAmount * xxx;
          // crash.xbet.amount.d = [currentBet];
          betRed.click();
        }

        if(!stop) {
            crash.waitGameStart().then(r2 => {
                console.log('Game started');
                myBet()
            })
        }
    })
}
myBet()

