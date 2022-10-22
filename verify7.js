const data = require('./data-five-million');

const run = () => {
  let currentId = 1754567;
  let balance = 1000;
  const betAmount = 1;
  while(currentId < 1764567) {
    balance -= betAmount * 2;
    if (data[currentId] < 2) {
      balance += betAmount * 1.96;
    }
    if (data[currentId] >= 1.5) {
      balance += 1.5 * betAmount
    }
    currentId += 1;
  }
  console.log("final balance: ", balance)
}

run()
// for (let i = 2000000; i < 3000000; i += 100000) {
//   console.log("-----------")
//   console.log("from: " + i, "to: " + (i + 100000))
//   getStatus(i, i + 100000);
// }