import { RegionData } from '../types';

export enum RegionOpacity {
  Max = 0.6,
  Mid = 0.45,
  Low = 0.3,
  Unselected = 0.13
}

export const getRegionOpacity = (regionId: string | number, regionsData: RegionData[]) => {
  const index = regionsData.findIndex((item) => item.id === regionId || item.postcode === regionId);
  
  if (index === -1) return RegionOpacity.Unselected
  
  if (index < 2) return RegionOpacity.Max
  
  if (index < 4) return RegionOpacity.Mid
  
  return RegionOpacity.Low
}