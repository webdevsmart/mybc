var config = {
  baseBet: { label: "base bet", value: 10, type: "number" },
  payout: { label: "payout", value: 2, type: "number" },
  betOver: { label: "reset if current bet > x times of lose", value: 6, type: "number" },
  invalidBetAmount: { label: "bet Amount of continouse 0", value: 0.0001, type: "number" },
  previousBet: { label: "previous bet amount of lose", value: 0, type: "number" },
  stopProfit: { label: "stop if profit >", value: 400, type: "number" },
  stopLose: { label: "stop if lose >", value: 400, type: "number" },
};
function main() {
  var currentBet = config.baseBet.value;
  var loseCount = 0;
  var winCount = 0;
  var pattern = "";
  var profit = 0;
  var continouseLose = 0;
  game.onBet = function () {
    game.bet(currentBet, config.payout.value).then(function (payout) {
      profit -= currentBet;
      if (payout > 1) {
        winCount += 1;
        log.success('win ' + winCount + " bet " + currentBet)
        profit += currentBet * config.payout.value;
        if (winCount == 1 && loseCount == 0) {
          currentBet = config.baseBet.value;
          winCount = 0;
          continouseLose = 0;
        } else if (winCount == 1 && loseCount == 1) {
          currentBet = config.baseBet.value;
          loseCount = 0;
          winCount = 0;
          continouseLose = 0;
        } else if (winCount == 1 && loseCount >= 2) {
          currentBet = config.previousBet.value;
          loseCount = 0
        } else if (winCount == 2 && loseCount < 2) {
          currentBet = config.baseBet.value;
          loseCount = 0;
          winCount = 0;
          continouseLose = 0;
        }
      } else {
        loseCount += 1;
        log.error('lose ' + loseCount + " bet " + currentBet)
        winCount = 0;
        if (loseCount == 1) {
          currentBet *= 2;
          continouseLose += 1;
        }
        if (loseCount == 2) {
          config.previousBet.value = currentBet * 2;
          currentBet = config.invalidBetAmount.value;
          continouseLose += 1;
        }
      }
      log.success('next bet ' + currentBet)
      if (profit > config.stopProfit.value || -profit > config.stopLose.value) {
        game.stop();
      }
      if (continouseLose >= config.betOver.value) {
        currentBet = config.baseBet.value;
        config.previousBet.value = config.baseBet.value;
        continouseLose = 0;
        game.stop();
      }
    });
  };
}