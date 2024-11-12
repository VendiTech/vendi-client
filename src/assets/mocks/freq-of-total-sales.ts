const baseData = Array(31)
  .fill(1)
  .map((item, i) => item * (i + 10));

export const freqOfTotalSales = [
  {
    label: 'Mint',
    values: baseData.slice(0, 31),
  },
  {
    label: 'Spearmint',
    values: baseData.slice(0, 29),
  },
  {
    label: 'Watermelon',
    values: baseData.slice(0, 31),
  },
].map((item, i) => ({
  ...item,
  values: item.values.map((value) =>
    Math.round(value + (i + 1) * 30 + (Math.random() - 0.5) * 30),
  ),
}));
