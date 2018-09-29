const fb = (n) => {
  if (n === 1) {
    return 1;
  }

  const iter = (acc, count) => {
    if (count === 1) {
      return acc;
    }

    return iter(acc * count, count - 1);
  };

  return iter(1, n);
};

fb(6);
