import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import EarthIcon from '@/assets/icons/Earth.svg';
import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useRegionFilters } from '../helpers/use-region-filters';
import { useUpdateUrl } from '../helpers/use-update-url';
import { BaseFilter } from './BaseFilter';

export const RegionFilter = () => {
  const { region } = useGlobalFilters();
  const regionFilters = useRegionFilters();
  const searchParams = useSearchParams();
  const handleParamChange = useHandleParamChange();
  const updateUrl = useUpdateUrl();

  const selectedRegions = region ?? [regionFilters[0].id];

  useEffect(() => {
    if (regionFilters.length < 2) return;

    const validatedRegionFilter = region?.filter((item) =>
      regionFilters.find((filter) => String(filter.id) === item),
    );

    const params = new URLSearchParams(searchParams);

    if (!validatedRegionFilter || !validatedRegionFilter.length) {
      params.delete(ParamsNames.Region);
    } else {
      params.set(ParamsNames.Region, validatedRegionFilter.join(','));
    }

    updateUrl(params);
  }, [region, regionFilters, searchParams, updateUrl]);

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
