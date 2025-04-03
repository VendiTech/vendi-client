export const getBase64Image = (base64: File | string) =>
  `data:image/png;base64,${base64}`;
