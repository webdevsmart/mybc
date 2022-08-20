var config = {
  baseBet: { label: "base bet", value: 1, type: "number" },
  payout: { label: "payout", value: 2, type: "number" },
  invalidBetAmount: { label: "bet Amount of continouse 0", value: 0.0001, type: "number" },
};

function main() {
  var currentBet = config.invalidBetAmount.value;
  var lastx = ["1", "1", "1", "1", "1"];
  var xxx = 1;
  var max_xxx = 1;

  game.onBet = function () {
    game.bet(currentBet, config.payout.value).then(function (payout) {
      lastx.shift();
      lastx.push(payout > 1 ? '1' : '0')
      log.success('lastx: ' + lastx.join(''))

      if (currentBet == config.baseBet.value * xxx) {
        if (payout > 1) {
          log.success('win xxx: ' + xxx)
          xxx = 1;
        } else {
          log.error('lose xxx:' + xxx)
          xxx *= 2;
          if (xxx > max_xxx)
            max_xxx = xxx
        }
  
        lastx = ["1", "1", "1", "1", "1"];
      }

      if (lastx.slice(1, 5).join('') === "1000") {
        currentBet = config.baseBet.value * xxx;
      } else {
        currentBet = config.invalidBetAmount.value;
      }
    });
  };
}