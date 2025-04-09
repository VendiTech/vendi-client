export const getBase64Image = (base64String: File | string) => {
  if (typeof base64String !== 'string') {
    return `data:image/png;base64,${base64String || ''}`;
  }

  const cleanBase64 = base64String.replace(/^data:image\/\w+;base64,/, '');

  if (cleanBase64.startsWith('PHN2Zy')) {
    return `data:image/svg+xml;base64,${cleanBase64}`;
  }

  if (cleanBase64.startsWith('iVBORw0KGgo')) {
    return `data:image/png;base64,${cleanBase64}`;
  }

  try {
    const decodedString = atob(cleanBase64);

    if (decodedString.startsWith('<svg') || decodedString.includes('<svg')) {
      return `data:image/svg+xml;base64,${cleanBase64}`;
    }

    if (decodedString.charCodeAt(0) === 137 &&
      decodedString.charCodeAt(1) === 80 &&
      decodedString.charCodeAt(2) === 78 &&
      decodedString.charCodeAt(3) === 71) {
      return `data:image/png;base64,${cleanBase64}`;
    }
  } catch (e) {
    console.error('Base64 decoding failed:', e);
  }

  return `data:image/png;base64,${cleanBase64}`;
}