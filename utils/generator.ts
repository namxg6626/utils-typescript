export const colorGenerator = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  if (randomColor[0].toLocaleLowerCase() === 'f') return colorGenerator();
  return '#' + randomColor;
};
