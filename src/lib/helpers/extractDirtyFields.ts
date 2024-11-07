/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeepMap, DeepPartial, FieldValues } from 'react-hook-form';

export const extractDirtyFields = <T extends FieldValues>(
  defaultFields: T,
  dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>,
): Partial<T> => {
  const result = Object.keys(dirtyFields).reduce((prev, curr) => {
    if (defaultFields[curr]) {
      //@ts-ignore
      prev[curr] = defaultFields[curr];
    }
    return prev;
  }, {} as Partial<T>);

  return result;
};
