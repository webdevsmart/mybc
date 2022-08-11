
const pickCards = (remainningCards, pickedCards) => {
  console.log(remainningCards)
  console.log(pickedCards)
  const number = pickedCards[pickedCards.length - 1][0]
  const color = pickedCards[pickedCards.length - 1][1]
  
  for (let i = 0; i < remainningCards.length; i++) {
    if (remainningCards[i][0] === number || remainningCards[i][1] === color) {
      pickedCards.concat(remainningCards[i])
      remainningCards.splice(i, 1)
      pickCards(remainningCards, pickedCards)
    }
  }
  
  if (result < pickedCards.length) {
    result = pickedCards.length
    resultArray = pickedCards
  }
}

const totalCards = ['1s', '2s', '3s', '1h', '2h', '4h', '1d', '2d', '3d', '1c', '2c', '3c']
const firstCard = '2s'
let result = 0, resultArray = []
pickCards(totalCards.filter(e => e !== firstCard), [firstCard])
console.log(result, resultArray)

