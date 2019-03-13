module.exports = function getZerosCount(number, base) {

  const basePrimeFactors = [];
  const zerosCount = [];

  const getOddMultiplier = function (N) {
    for (let i = 3; i * i <= N; i += 2) {
      let n = 0;

      while (N % i === 0) {
        N /= i;
        n++;
      }

      if (n > 0) {
        basePrimeFactors.push({primeFactor: i, degree: n});
      }
    }

    if (N > 1) {
      basePrimeFactors.push({primeFactor: N, degree: 1});
    }
  };

  const getEvenMultiplier = function () {
    let N = base;
    let n = 0;

    while (N % 2 === 0) {
      N /= 2;
      n++;
    }

    if (n > 0) {
      basePrimeFactors.push({primeFactor: 2, degree: n});
    }

    getOddMultiplier(N);
  };

  const count = function (div) {
    let zeroCount = 0;
    let divider = div.primeFactor;

    for (let i = 1; divider <= number; i++) {
      divider = Math.pow(div.primeFactor, i);
      zeroCount += Math.floor(number / divider);
    }

    return zeroCount;
  };

  getEvenMultiplier();

  for (let i = 0; i < basePrimeFactors.length; i++) {
    zerosCount.push(Math.floor(count(basePrimeFactors[i]) / basePrimeFactors[i].degree));
  }

  return Math.min(...zerosCount);
};
