const romanMap = [
  { arabic: '1000', roman: 'M' },
  { arabic: '500', roman: 'D' },
  { arabic: '100', roman: 'C' },
  { arabic: '50', roman: 'L' },
  { arabic: '10', roman: 'X' },
  { arabic: '5', roman: 'V' },
  { arabic: '1', roman: 'I' },
];

const getHeadDigit = (num) => {
  const stringNum = String(num);
  return (
    stringNum[0] +
    String(
      Array(stringNum.length - 1)
        .fill(0)
        .join('')
    )
  );
};

const convertDigitToRoman = (digit) => {
  console.log(digit);
  if (digit === 0) {
    return '';
  }

  if (digit === 4) {
    return 'IV';
  }

  let preBefore, before, after;

  let interrupt = false;

  romanMap.forEach(({ arabic, roman }, index) => {
    if (interrupt) {
      return;
    }
    if (arabic <= digit) {
      preBefore = romanMap[index + 1] || null;
      before = { arabic, roman };
      after = romanMap[index - 1] || null;
      interrupt = true;
    }
  });

  let result;

  if (before.arabic[0] === '1') {
    result = Array(digit / before.arabic)
      .fill(before.roman)
      .join('');
  } else {
    if (after.arabic - digit === Number(preBefore.arabic)) {
      result = preBefore.roman + after.roman;
    } else {
      result =
        before.roman +
        Array((digit - before.arabic) / preBefore.arabic)
          .fill(preBefore.roman)
          .join('');
    }
  }

  return result;
};

module.exports = {
  RomanNumerals: {
    toRoman: convertDigitToRoman,
  },
};
