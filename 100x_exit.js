var config = {
  bet: { label: 'bet', value: 1, type: 'number' },
  payout: { label: 'payout', value: 100, type: 'number' },
  baseBet: { label: 'Start Bet amount', value: currency.minAmount, type: 'number' },
  baseCount: { label: 'Start from count >', value: 200, type: 'number' }
}

function main() {
  var currentBet = config.baseBet.value;
  var currentPayout = config.payout.value;
  var totalCount = 0;
  var totalShot = 0;
  var currentCount = 0;
  game.onBet = function () {
    game.bet(currentBet, currentPayout).then(function (payout) {
      totalCount += 1;
      currentCount += 1;
      if (payout > 1) {
        log.success("We won, payout " + payout + "X! " + currentCount);
        if (currentBet == config.bet.value) {
          game.stop();
        }
        totalShot += 1;
        currentCount = 0;
        currentBet = config.baseBet.value;
      } else {
        log.error('Lose ' + currentCount + ' times ' + currentBet)
      }
      if (currentCount > config.baseCount.value) {
        currentBet = config.bet.value;
      }
    });
  }
}
