export const repeatColors = (colors: string[], itemsCount: number) => {
  const newColors: string[] = []

  let i = 0

  while (newColors.length < itemsCount) {
    newColors.push(colors[i % colors.length]);

    i++
  }

  return newColors;
}
