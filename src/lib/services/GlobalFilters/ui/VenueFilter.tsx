import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useVenueFilters } from '../helpers/use-venue-filters';
import { useValidateUrl } from '../helpers/use-validate-url';
import { BaseFilter } from './BaseFilter';
import { useState } from 'react';
import { useDebounce } from '@/lib/helpers/use-debounce';

export const VenueFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 750);

  const { venue } = useGlobalFilters();
  const { items, fetchNextPage } = useVenueFilters(debouncedSearchTerm);
  const handleParamChange = useHandleParamChange();

  const selectedVenue = venue ?? [items[0].id];

  useValidateUrl(ParamsNames.Venue, venue, items);

  return (
    <BaseFilter
      multiple
      showSearch
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      onChange={(e) =>
        handleParamChange({
          paramName: ParamsNames.Venue,
          newParamValue: e.target.value as string[],
        })
      }
      displayValue={
        venue
          ? items
              .filter((item) => venue.includes(String(item.id)))
              .map((item) => item.name)
              .join(', ')
          : items[0].name
      }
      options={items.map((item) => ({
        key: item.id,
        value: item.id,
        displayValue: item.name,
      }))}
      value={selectedVenue}
      fetchNextPage={fetchNextPage as () => void}
    />
  );
};
