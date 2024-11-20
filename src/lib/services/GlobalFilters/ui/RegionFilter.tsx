import EarthIcon from '@/assets/icons/Earth.svg';
import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useRegionFilters } from '../helpers/use-region-filters';
import { useValidateUrl } from '../helpers/use-validate-url';
import { BaseFilter } from './BaseFilter';

export const RegionFilter = () => {
  const { region } = useGlobalFilters();
  const regionFilters = useRegionFilters();
  const handleParamChange = useHandleParamChange();

  const selectedRegions = region ?? [regionFilters[0].id];

  useValidateUrl(ParamsNames.Region, region, regionFilters);

  return (
    <BaseFilter
      multiple
      showSearch
      onChange={(e) =>
        handleParamChange(ParamsNames.Region, e.target.value as string[])
      }
      displayValue={
        region
          ? regionFilters
              .filter((item) => region.includes(String(item.id)))
              .map((item) => item.name)
              .join(', ')
          : regionFilters[0].name
      }
      icon={<EarthIcon width={16} height={16} />}
      options={regionFilters.map((item) => ({
        key: item.id,
        value: String(item.id),
        displayValue: item.name,
      }))}
      value={selectedRegions}
    />
  );
};
