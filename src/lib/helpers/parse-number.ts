export const parseNumber = (num: number, reduceThousands?: boolean) => {
  if (num < 1000) {
    return num.toString();
  }

  if (num >= 1000 && num < 1000000) {
    return reduceThousands
      ? Math.round(num / 1000) + 'k'
      : num.toLocaleString();
  }

  return (num / 1000000).toFixed(2) + 'M';
};
