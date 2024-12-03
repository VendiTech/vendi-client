export const getGrowthPercent = (
  previousValue: number,
  currentValue: number,
) =>
  previousValue !== 0
    ? ((currentValue - previousValue) / previousValue) * 100
    : currentValue !== 0
      ? 100
      : 0;
