import { getNestedSelectedOptions } from '../helpers/getNestedSelectedOptions';
import { NestedOptionType, OptionType } from '../types';

export const getPreselectedOptions = (
  options: OptionType[],
  value: unknown,
) => {
  if (!Array.isArray(value)) return [];

  const selectedOuterOptions = getNestedSelectedOptions(value as string[], 0);

  const selectedNestedOptions = getNestedSelectedOptions(value as string[], 1);

  const newNestedValue: NestedOptionType[] = [];

  options.forEach((outerOption) =>
    outerOption.children?.forEach((nestedOption) => {
      if (selectedNestedOptions.includes(nestedOption.value)) {
        newNestedValue.push({
          ...nestedOption,
          level: 1,
        });
      }
    }),
  );

  return [
    ...options
      .filter((option) => selectedOuterOptions.includes(option.value))
      .map((option) => ({ ...option, level: 0 })),
    ...newNestedValue,
  ];
};
