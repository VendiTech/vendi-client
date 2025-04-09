import EarthIcon from '@/assets/icons/Earth.svg';
import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useRegionFilters } from '../helpers/use-region-filters';
import { useValidateUrl } from '../helpers/use-validate-url';
import { BaseFilter } from './BaseFilter';
import {
  createNestedSelectOption,
  getNestedSelectedOptions,
} from '@/ui/atoms/Select';
import { useState } from 'react';
import { useDebounce } from '@/lib/helpers/use-debounce';

export const RegionFilter = () => {
  const handleParamChange = useHandleParamChange();
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 750)

  const { region, machine } = useGlobalFilters();
  const { regionFilters, fetchNextRegions } = useRegionFilters(debouncedSearchTerm);

  useValidateUrl(ParamsNames.Region, region, regionFilters);

  const handleChange = (values: string[]) => {
    handleParamChange([
      {
        paramName: ParamsNames.Region,
        newParamValue: getNestedSelectedOptions(values, 0),
      },
      {
        paramName: ParamsNames.Machine,
        newParamValue: getNestedSelectedOptions(values, 1),
      },
    ]);
  };

  const value =
    !region && !machine
      ? [regionFilters[0].id]
      : [
          ...(region ?? []).map((item) => createNestedSelectOption(item, 0)),
          ...(machine ?? []).map((item) => createNestedSelectOption(item, 1)),
        ];

  return (
    <BaseFilter
      multiple
      showSearch
      isNested
      onChange={(e) => handleChange(e.target.value as string[])}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      ignoreSearch
      displayValue={
        region
          ? regionFilters
              .filter((item) => region.includes(String(item.id)))
              .map((item) => item.name)
              .join(', ')
          : regionFilters[0].name
      }
      icon={<EarthIcon width={16} height={16} />}
      options={regionFilters.map((region) => ({
        key: region.id,
        value: String(region.id),
        displayValue: region.name,
        children: region.children.map((machine) => ({
          key: machine.id,
          value: String(machine.id),
          displayValue: machine.name,
        })),
      }))}
      value={value}
      fetchNextPage={fetchNextRegions}
    />
  );
};
