export const getNestedSelectedOptions = (options: string[], level: number) =>
  options
    .filter((item) => typeof item === 'string' && item.includes(`//${level}`))
    .map((item) => item.split('//')[0]);
