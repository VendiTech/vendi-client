import { regionsMapping } from '@/assets/map/regions-mapping';

export const getRegionPostcode = (regionId: string | null) =>
  regionsMapping.find((item) => item.id === +(regionId ?? -1))?.postcode.toUpperCase().replace('-', '.');
