const baseData = Array(31)
  .fill(1)
  .map((item, i) => item * (i + 1));

export const impressionByMonth = [
  {
    label: 'January',
    values: baseData.slice(0, 31),
  },
  {
    label: 'February',
    values: baseData.slice(0, 29),
  },
  {
    label: 'March',
    values: baseData.slice(0, 31),
  },
  {
    label: 'April',
    values: baseData.slice(0, 30),
  },
  {
    label: 'May',
    values: baseData.slice(0, 31),
  },
  {
    label: 'June',
    values: baseData.slice(0, 30),
  },
  {
    label: 'July',
    values: baseData.slice(0, 31),
  },
  {
    label: 'August',
    values: baseData.slice(0, 31),
  },
  {
    label: 'September',
    values: baseData.slice(0, 30),
  },
  {
    label: 'October',
    values: baseData.slice(0, 31),
  },
  {
    label: 'November',
    values: baseData.slice(0, 30),
  },
  {
    label: 'December',
    values: baseData.slice(0, 31),
  },
].map((item, i) => ({
  ...item,
  values: item.values.map((value) =>
    Math.round(value + (i + 1) * 30 + (Math.random() - 0.5) * 40),
  ),
}));
