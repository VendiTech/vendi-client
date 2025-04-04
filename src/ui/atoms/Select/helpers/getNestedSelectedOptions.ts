export const getNestedSelectedOptions = (options: string[], level: 1 | 0) =>
  options
    .filter((item) => {
      if (level === 0) {
        return !item.includes('//1');
      }

      return item.includes('//1');
    })
    .map((item) => item.split('//')[0]);
