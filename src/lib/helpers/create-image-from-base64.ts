import { getBase64Image } from '@/lib/helpers/get-base64-image';

export const createImageFromBase64 = async (base64?: string | File) => {
  if (!base64) return 
  
  const base64Response = await fetch(getBase64Image(base64));
  const blob = await base64Response.blob();
  
  return new File([blob], `${Date.now()}.png`, { type: 'image/png' });
};
