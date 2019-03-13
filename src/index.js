module.exports = function getZerosCount(number, base) {

  const primeFactors = [];
  const zerosCount = [];

  const getOddMultiplier = function (N) {
    for (let i = 3; i * i <= N; i += 2) {
      let n = 0;
      while (N % i === 0) {
        N /= i;
        n++;
      }
      if (n > 0) {
        primeFactors.push([i, n]);
      }
    }
    if (N > 1) {
      primeFactors.push([N, 1]);
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
      primeFactors.push([2, n]);
    }

    getOddMultiplier(N);
  };

  const count = function (delimeter) {
    let zeroCount = 0;
    let divider = delimeter[0];

    for (let i = 1; divider <= number; i++) {
      divider = Math.pow(delimeter[0], i);
      zeroCount += Math.floor(number / divider);
    }

    return zeroCount;
  };

  getEvenMultiplier();

  for (let i = 0; i < primeFactors.length; i++) {
    zerosCount.push(Math.floor(count(primeFactors[i]) / primeFactors[i][1]));
  }

  return Math.min(...zerosCount);
};

