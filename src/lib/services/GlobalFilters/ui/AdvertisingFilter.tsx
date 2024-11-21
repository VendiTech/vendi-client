import AdvertisingIcon from '@/assets/icons/Bullhorn.svg';
import { ParamsNames } from '../helpers/params-names';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { BaseFilter } from './BaseFilter';

const advertisingIdFilters = ['All', '1', '2', '3'];

export const AdvertisingFilter = () => {
  const { advertisingId } = useGlobalFilters();
  const handleParamChange = useHandleParamChange();

  const selectedAdvertisingId = advertisingId ?? advertisingIdFilters[0];

  return (
    <BaseFilter
      onChange={(e) =>
        handleParamChange(ParamsNames.AdvertisingId, String(e.target.value))
      }
      icon={<AdvertisingIcon width={16} height={16} />}
      options={advertisingIdFilters.map((item) => ({
        key: item,
        value: item,
      }))}
      value={selectedAdvertisingId}
    />
  );
};
