import { GeographyDetailSchema } from '@/lib/generated/api';
import { regionsMapping } from '@/assets/map/regions-mapping';

export const getRegionName = (
  postcode: string,
  regions?: GeographyDetailSchema[],
) =>
  regions?.find(
    (item) =>
      regionsMapping.find((region) => region.postcode === postcode)?.id ===
      item.id,
  )?.name;
