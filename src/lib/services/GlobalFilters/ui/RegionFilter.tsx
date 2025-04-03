import EarthIcon from '@/assets/icons/Earth.svg';
import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useRegionFilters } from '../helpers/use-region-filters';
import { useValidateUrl } from '../helpers/use-validate-url';
import { BaseFilter } from './BaseFilter';
import { getNestedSelectedOptions } from '@/ui/atoms/Select';

export const RegionFilter = () => {
  const { region } = useGlobalFilters();
  const regionFilters = useRegionFilters();
  const handleParamChange = useHandleParamChange();

  const selectedRegions = region ?? [regionFilters[0].id];

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

  return (
    <BaseFilter
      multiple
      showSearch
      isNested
      onChange={(e) => handleChange(e.target.value as string[])}
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
      value={selectedRegions}
    />
  );
};
