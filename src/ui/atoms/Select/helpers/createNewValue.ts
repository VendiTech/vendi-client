import { NestedOptionType } from '../types';
import { isDescendant } from './isDescendant';

type Args = {
  selectedOption: NestedOptionType;
  value: NestedOptionType[];
  multiple?: boolean;
  isNested?: boolean;
};

type Return = {
  eventValue: (string | number)[] | (string | number);
  stateValue: NestedOptionType[];
};

export const createNewValue = ({
  selectedOption,
  value,
  multiple,
  isNested,
}: Args): Return => {
  if (!multiple) {
    return {
      eventValue: selectedOption.key,
      stateValue: [selectedOption],
    };
  }

  const exists = value.some((option) => option.key === selectedOption.key);
  const stateValue = exists
    ? value.filter((option) => option.key !== selectedOption.key)
    : [
        ...value.filter(
          (option) =>
            !isDescendant(option, selectedOption) &&
            !isDescendant(selectedOption, option),
        ),
        selectedOption,
      ];

  const eventValue = stateValue.map((option) => isNested ? `${option.key}//${option.level}` : option.key);

  return {
    eventValue,
    stateValue,
  };
};
