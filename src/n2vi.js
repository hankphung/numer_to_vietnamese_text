/**
 * Convert from number to Vietnamese string.
 * By Dong Hung Phung <donghung.viethanit@gmail.com>
 */
const toVietnamese = (function () {
  const defaultNumbers = ' hai ba bốn năm sáu bảy tám chín';
  const dict = {
    units: ('? một' + defaultNumbers).split(' '),
    tens: ('lẻ mười' + defaultNumbers).split(' '),
    hundreds: ('không một' + defaultNumbers).split(' '),
  };
  const tram = 'trăm';
  const digits = 'x nghìn triệu tỉ nghìn'.split(' ');

  function tenth(twoDigitBlock) {
    let secondDigitWord = dict.units[twoDigitBlock[1]];
    const result = [dict.tens[twoDigitBlock[0]]];
    if (twoDigitBlock[0] > 0 && twoDigitBlock[1] == 5) secondDigitWord = 'lăm';
    if (twoDigitBlock[0] > 1) {
      result.push('mươi');
      if (twoDigitBlock[1] == 1) secondDigitWord = 'mốt';
    }
    if (secondDigitWord !== '?') result.push(secondDigitWord);
    return result.join(' ');
  }

  function blockOfThree(threeDigitBlock) {
    switch (threeDigitBlock.length) {
      case 1:
        return dict.units[threeDigitBlock];
      case 2:
        return tenth(threeDigitBlock);
      case 3:
        const result = [dict.hundreds[threeDigitBlock[0]], tram];
        if (threeDigitBlock.slice(1, 3) !== '00') {
          const secondAndThirdDigitWords = tenth(threeDigitBlock.slice(1, 3));
          result.push(secondAndThirdDigitWords);
        }
        return result.join(' ');
    }
    return '';
  }

  function formatNumber(numberString) {
    numberString += '';
    const numberParts = numberString.split('.');
    let integerPart = numberParts[0];
    const decimalPart = numberParts.length > 1 ? '.' + numberParts[1] : '';
    const regex = /(\d+)(\d{3})/;
    while (regex.test(integerPart)) {
      integerPart = integerPart.replace(regex, '$1' + ',' + '$2');
    }
    return integerPart + decimalPart;
  }

  function digitCounting(index, digitCounter) {
    return digits[index];
  }

  function toVietnamese(input, currency) {
    const numberString = parseInt(input) + '';
    let currentIndex = numberString.length;
    if (currentIndex === 0 || numberString === 'NaN') return '';
    const numberBlocks = [];
    const result = [];

    while (currentIndex >= 0) {
      numberBlocks.push(numberString.substring(currentIndex, Math.max(currentIndex - 3, 0)));
      currentIndex -= 3;
    }

    let digitCounter = 0;
    let digit;
    for (let i = numberBlocks.length - 1; i >= 0; i--) {
      if (numberBlocks[i] === '000') {
        digitCounter += 1;
        if (i === 2 && digitCounter === 2) {
          result.push(digitCounting(i + 1, digitCounter));
        }
      } else if (numberBlocks[i] !== '') {
        digitCounter = 0;
        result.push(blockOfThree(numberBlocks[i]));
        digit = digitCounting(i, digitCounter);
        if (digit && digit !== 'x') result.push(digit);
      }
    }

    if (currency) result.push(currency);
    return result.join(' ');
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = toVietnamese;
  } else if (typeof window !== 'undefined') {
    window.toVietnamese = toVietnamese;
  }

  return toVietnamese;
})();
