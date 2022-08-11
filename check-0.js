const fs = require('fs');

let pattern = "1011111111000110000011111100100001101100000010101000011001110110111111010101100111000101001100100000010000110101000110001001011011111000110101101101100101110001011011110111101111101110001001111010110101100000110010100000111011101010110111011001100000101101010011110110010100011000001100100000001001101111100011101001010110000110000010100001110010000110000000011011000100110101111110001011101111000111011111001011100110101111011011111000001001001010011011001010001100110101100011001100001001011001100001111110110101001000111111110011010100011101000010001001011111011111101111101001000011011100011001111110111010101100001011000111101010010001110101000001110010000011000011100110000100101101101111111111010010100001011001011110001110010011101000101010110100100100001101101001010011011010100100110111011010010100100110101000101111110111111001001011000111111111000000101011111010011111001101000000001101111111101100001110001000011001100011010100000100111111000010101000000000101100101111100110111100100000000100111010101001101101010100101011110111110101101010001101100100000000100100101001101000111000000111010101010001110101011110111100100100010010010110011101011011011111111111011101001111010000111010010111110110111000000110010010010101010001110101101101110101111110101100111101111101010001110100011000111000100101010011111001001100110101001011000011100000101100001010010100011001001011111001110101000111010000000110110010111001010001000110110001111110000101111000001111111001000001111010101011110000100101101011011100110110100101011111001011110100001100001110000101010001101001100110110111110011100010001100101110000110101100010001101101010110011011011110000111011010010110101010110001111100001000111011101010111101100000000101000000111001001001110001001011101011101100000011101011111011111001011011110111111110001010000000011101000000001000110001111001000110101001101001100110010000100111000001111110100111110011010010000101011100001101000001110011101001011111111110011110100111101110001111100000000111100010010010011001100111111001110101010101100010101000001010101100010111111101111010010110111000010000011100001001011000110000101111110001000010111001111000110001100100001111110111011011111101101100000000011100111011001011101101010011101000000011110000111011011100010000111111010010111110000010100011010101101111010010001001001111010110101111011011111010001001000010011101100011011100111001100100110001011010001010011011000100011110110011110110011011010101000101111101011010100100011010100101101100100110111011100100101110011001011000111011101001011110110101001100111001110001111100110011101100011101110000111001100111100000001101000101101100001001000000010000001100001001010010000110000001111100011101001011111111010100001000011011101111000000011000111000011100010110011100101011110111001100110010000111110101110111101101000111011001000000110011010101011010100011011101010100100001100001001100101010110000010011110011100110010111001000000111111010100010100011011110011101010011101001000111000111010011011001110011110110101111110110101000110110010110101100000101001000101011010100110100001111110100100010110011101000100011010111000111100110010110001011100100001000110000100010001010000010001001100000001001011100110000100111010001001010001110101110100101011101100000111001001101111110110000010111010011100000101000000110101000100001001110010110101110000011101111011100010111011100000101110100110000100000101101111010110100011010100101110011100011001101011100101011110100011111101100000100100001110000001110000110100100110011011000011001000100100000000010010001110001100000011000000110111100100001000100011111001100100101111100000001011101101100110110110000101101010111101001100011010110010111000010011010010000010111000111011000111010011000111110100000111010110000001011011111011011100000001001110000100001001100110100010111110001010101001111001001001011011000100111110100110011101111100000000100010111111111000100010001001101100101101110010110110000110111101011110010011110011111001111001010000000110111010100001110100110101010101110101100101100010101011110010100111100000000101000001010101100100110000100001110111111101010101100000110100100100110110000101000111110000000001111100100011001111000111100011101110101101010101011100111000100100011010011010110100010100000010000101101101000001100000011001010000000010011010111010110000000111110101010100001010001110001000100101111000000101000100000111011010111011110101001010110100101110001100101111010001011100010100000111000111000100001101001000000011011111111111001101100001001010011100110010011001011000100100000100110101000111000101101111100111001110001011111111001010001110011110101110001100111010101011101111111000111010100100111011010110010011000110111100110011101010000011011011011111001110110111111110100010110001111100111111101100101110110010011101100001110001110111110001111000001010100010010100110011110110101000110001110001110011001001000100100001000110111101101111100010010100101010001000010111010001101001110010110110000000000111010111000101001000001010010000111010001101000110010001110010101011011111010001111000111101111000000101000010011110010011000110001001111110011100010001100011100110000111001100101110010010110110100111110010101010110110000100111100001000010111011100110010011110001000001001001100000100001111100001110001110000110000010101111011111011111001001000001011000101000101111100101101011111010001010101111100110110011110010100110010011000011011011111111101100111100000111000001111111101011100001001110010110010110111110111111100100001000100010000100010110001101010110111110010101111010110001100110000100110000010000101111010100010010111011100100011010011100010000110010100111011100111000100101110100100111101000100010000101011111111101001110011001111001010000101100100111000100010111101101110110011001001111011101000100001011100110101010011111100100111000100011110110010001001110011011010011000101011110001001110000110101001001111000110101011110101110100001001110100111000011011110001000010011000001001011011100110011100110101001100000110111010011101111101010111000100011000101101010110001101001010011000101100001010100011010010001110101101100111011000001001010000010001111111010101100101110100111100001101101110011110111000011001001100011110111010011001100010011100100100111001110011011111111100001111011011101101010110001110010001111111000011000111010000101000010001101000111000011101010000111111000011101001011011100101110010110010010101010101000000011101010101100110111000101010000110010010011011101111110100001001010110011010100100101100110000000010011000000111100100000011110001001101101000111110100000001100101000000010000000110110110000100010101111100011110110010001111100111110100011011100101110010000101011010001011111000001010011001100001101000100011000011100101110101111000100001101001111100001101010101010001100000111001100010101101000100010110101111110000000011110001100111111011011011111100000100001011001101100000000000111000011001001010001101001001001101111110001101100100110011001111101010110100100001111001111110000000111000110000100010111111100011001001110111010000110000111000101100000011010011100111111101000100001111010010111011100000001010111000001110100010111110010001000011101111100001110011100000100010100000011011100010010110011010100110110100000101010111111111110001000010110110001110100001001101001110101010010111001101010111001001011101011001011100111101011100010100111101111101101011101000101001001001111111011111101010101100000110111100110000101010011100111111111111100100011000111010001101000111100000011100100011110011000001101010100110110011110111111000011110000010111010001011001110000100000010011010101000011001101111010100010111001111001011111010001000001010110101100011010110011000111010011110101100111110100111010110011101011001010101111010110110111011011110001100100111010001011010110110010101010100101110101101001000101011011110100100010110001000101011100101110011001101001111101011100111101100111100011010010001110110100011000111001000001110010010011101111001011000001001011011001101011000000011001101011000001100000001001100000111110000010011001010111000000010001101100110110110111111010101100100001101011110111011101110011001101000111110111101001101010100110000000010001001100001000100101010001110000100011111111111001000101000100110010010001111110100100001110111110110100001001110000101111000010001000111011111011100000010000011110010100010000111101100011010000011011011111011110100100111011001011100011001110010110011111000001000111111010001110111100101111110001100101101010000010100001111111111011101011110001000001101010011101000101110101111110101110110011000000111011100000011100111000111101110011101000101000100110100010111101011110000101000001101000001101111101101010110001101111000100010101001001011101010010111000101011011011010010100000100101011011111101010101111011110110100001001001010101101011011000110001001110000101110111011111000111011111111101001110100000101101111010110000101110100111110101000100010010100100101011001101011100101111001100011111101000111100101101110000111000101011110011110110000001000100111101010011110101100111010100100101000111000010110101100011000111000000100110100000011010011101100001100101101010111100111100000110000101000101110110010000010111111010000111101111001101110001010111110000010100101001101111011010011000001110011100011001111001101110111011101001110000100001001001110010100000000101111011101100110100000101011011101011111101110010001011100000101011111101100111110111000101111001100001011100101000001110001010001111111111010101000001110000010111001000011001111011110000101110000010110100101000000011101001100000011100011111110110010011110100101011011011000101101011111000111111010101100011100000110111011101110110000010001110111011001000001010100101111000011101010000111010100011110111000111000111000100010011001111100100000010000011011011010111101010001100001001001100111011011110110111100000011001011110110100110110001010001001100010011011001111101011101110111001001110011010110010100000111000011100010110010011011101110";

const readPattern = () => {
  return new Promise(resolve => {
    fs.readFile('./last10000.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        resolve("");
      }
      resolve(data);
    });
  })
}

const checkWinOrLose = (strPattern) => {
  let count = (strPattern.match(/0/g) || []).length;

  let count010 = (strPattern.match(/1[1]+0/g) || []).length;

  if (count - count010 > 36)
    return true;
  else
    return false;
}

const calc = async () => {
  pattern = await readPattern();
  let subPatterns = pattern.split(/01[1]+01[1]+011/g) || []
  let winCount = 0, loseCount = 0;
  let str = "";

  for (let i = 0; i < subPatterns.length; i++) {
    if (checkWinOrLose(subPatterns[i])) {
      winCount++;
      console.log("0 - ", subPatterns[i].length)
    } else {
      loseCount++;
      console.log("1 - ", subPatterns[i].length)
    }
  }

  console.log("Win Count: ", winCount)
  console.log("Lose Count: ", loseCount)
}

calc();