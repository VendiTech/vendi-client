const baseData = Array(31)
  .fill(1)
  .map((item, i) => item * (i + 1));

export const impressionByMonth = [
  {
    label: 'Jan',
    values: baseData.slice(0, 31),
  },
  {
    label: 'Feb',
    values: baseData.slice(0, 29),
  },
  {
    label: 'Mar',
    values: baseData.slice(0, 31),
  },
  {
    label: 'Apr',
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
    label: 'Aug',
    values: baseData.slice(0, 31),
  },
  {
    label: 'Sept',
    values: baseData.slice(0, 30),
  },
  {
    label: 'Oct',
    values: baseData.slice(0, 31),
  },
  {
    label: 'Nov',
    values: baseData.slice(0, 30),
  },
  {
    label: 'Dec',
    values: baseData.slice(0, 31),
  },
].map((item, i) => ({
  ...item,
  values: item.values.map((value) =>
    Math.round(value + (i + 1) * 30 + (Math.random() - 0.5) * 40),
  ),
}));
