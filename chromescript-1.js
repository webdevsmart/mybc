let baseAmount;
let myAmounts = null;
let betCount = 0;
let stop = false;
const betGreen = document.getElementsByClassName("type200")[0];
let myBet = null;

baseAmount = 10;
myAmounts = [[baseAmount], [baseAmount * 2], [baseAmount * 4]];

myBet = () => {
    crash.waitGameEnd().then(res => {
        console.log('Game end', res.odds);
        if(res.odds >= 2){
            crash.xbet.amount.d = myAmounts[betCount % 3];
            betCount += 1;
            betGreen.click();
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