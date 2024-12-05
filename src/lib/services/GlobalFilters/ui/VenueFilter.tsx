import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useVenueFilters } from '../helpers/use-venue-filters';
import { useValidateUrl } from '../helpers/use-validate-url';
import { BaseFilter } from './BaseFilter';

export const VenueFilter = () => {
  const { venue } = useGlobalFilters();
  const venueFilters = useVenueFilters();
  const handleParamChange = useHandleParamChange();

  const selectedVenue = venue ?? [venueFilters[0].id];

  useValidateUrl(ParamsNames.Venue, venue, venueFilters);

  return (
    <BaseFilter
      multiple
      showSearch
      onChange={(e) =>
        handleParamChange(ParamsNames.Venue, e.target.value as string[])
      }
      displayValue={
        venue
          ? venueFilters
              .filter((item) => venue.includes(String(item.id)))
              .map((item) => item.name)
              .join(', ')
          : venueFilters[0].name
      }
      options={venueFilters.map((item) => ({
        key: item.id,
        value: item.id,
        displayValue: item.name,
      }))}
      value={selectedVenue}
    />
  );
};
