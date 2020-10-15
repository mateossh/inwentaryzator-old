export const formatPrice = (number) => {
  const options = {
    'minimumFractionDigits': 2,
    'maximumFractionDigits': 2,
    // 'style': 'currency',
    // 'currency': 'PLN',
  };
  return number ? number.toLocaleString(undefined, options) : "";
};

export const getIntegerPart = (num) => {
  return Math.trunc(num);
};

export const fractionalDigitsAsStr = (num) => {
  return String(num).split('.')[1] || "00";
};
