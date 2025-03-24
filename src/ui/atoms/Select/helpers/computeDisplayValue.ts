import { BaseSelectProps, OptionType } from '@/ui/atoms/Select/types';

type Args = {
  value: OptionType[];
} & Pick<BaseSelectProps, 'displayValue' | 'defaultText'>;

export const computeDisplayValue = ({ value, displayValue, defaultText }: Args) => {
  const val = displayValue ?? value;

  if (!Array.isArray(val)) {
    return val as string;
  }

  if (!val.length) {
    return defaultText || '';
  }

  return val
    .map((option: OptionType) => option.displayValue ?? option.value)
    .join(', ');
};
