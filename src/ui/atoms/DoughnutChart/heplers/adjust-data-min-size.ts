const MIN_SECTOR_SIZE = 0.02

export const adjustDataMinSize = (values: number[]) => {
  const originalSum = values.reduce((sum, value) => sum + value, 0);
  const minThreshold = originalSum * MIN_SECTOR_SIZE;

  const adjustedValues = values.map(value =>
    value < minThreshold ? minThreshold : value
  );

  const adjustedSum = adjustedValues.reduce((sum, value) => sum + value, 0);
  const normalizationFactor = originalSum / adjustedSum;

  return adjustedValues.map(value => value * normalizationFactor);
}
