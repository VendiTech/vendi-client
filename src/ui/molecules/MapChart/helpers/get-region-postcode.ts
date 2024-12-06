import { regionsMapping } from '@/assets/map/regions-mapping';

export const getRegionPostcode = (regionId: string | null) =>
  regionsMapping.find((item) => item.name === regionId)?.postcode.toUpperCase().replace('-', '.');
