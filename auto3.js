var config = {
  baseBet: { label: "base bet", value: 10, type: "number" },
  payout: { label: "payout", value: 2, type: "number" },
  invalidBetAmount: { label: "bet Amount of continouse 0", value: 0.0001, type: "number" },
};
function main() {
  var currentBet = config.baseBet.value;
  var loseCount = 0;
  var winCount = 0;
  game.onBet = function () {
    game.bet(currentBet, config.payout.value).then(function (payout) {
      if (payout > 1) {
        winCount++;
        if (loseCount == 1 && winCount == 1) {
          currentBet = config.baseBet.value;
        } else {
          currentBet = config.invalidBetAmount.value;
        }
        loseCount = 0;
        winCount = 0;
      } else {
        loseCount = 1;
        currentBet = config.invalidBetAmount.value;
      }
      log.success("next bet: " + currentBet)
    });
  };
}