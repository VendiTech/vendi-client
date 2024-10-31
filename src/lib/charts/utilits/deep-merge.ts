
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepMerge = (target: any, source: any) => {
  if (
    typeof target !== 'object' ||
    typeof source !== 'object' ||
    target === null ||
    source === null
  ) {
    return source;
  }

  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
}