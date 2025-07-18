import { Box } from '@mui/material';
import { useGetGeographies } from '@/lib/api';
import mapRegions from '@/assets/map/nuts1.json';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { useGeographyManagementModal } from '@/ui/organisms/GeographyManagementTable/GeographyManagementModal';
import { BaseSelect } from '@/ui/atoms/Select';
import { useCreateLocationMapping } from '@/lib/api/hooks/geographies/useCreateLocationMapping';

type Props = {
  searchTerm: string;
};

export const GeographyManagementTable = ({ searchTerm }: Props) => {
  const { data: nayaxGeographies } = useGetGeographies();
  const { mutate: createLocationMapping } = useCreateLocationMapping();

  const regionsOptions = mapRegions.features.map((feature) => ({
    key: feature.id,
    value: String(feature.id),
    displayValue: feature.properties.nuts118nm,
  }));

  const tableData = (nayaxGeographies?.data.items ?? []).map((geo) => ({
    ...geo,
    id: String(geo.id),
  }));

  const [openGeographyManagementModal, closeGeographyManagementModal] =
    useGeographyManagementModal();

  const tableProps = createTableProps({
    data: tableData,
    searchTerm,
    fieldsForSearch: ['name'],
    sx: { minHeight: '75vh' },
    columns: [
      {
        field: 'name',
        title: 'Nayax location',
        render: (nayaxLocation) => (
          <Box sx={{ width: '100%' }}>{nayaxLocation.name}</Box>
        ),
      },
      {
        field: 'id',
        title: 'Map location',
        render: (nayaxLocation) => {
          const selectedLocation =
            regionsOptions.find(
              (option) => option.value === String(nayaxLocation.map_location),
            )?.displayValue ?? '';

          return (
            <Box sx={{ maxWidth: 300 }}>
              <BaseSelect
                options={regionsOptions}
                selectedValue={selectedLocation}
                onChange={(e) =>
                  createLocationMapping({
                    geographyId: +nayaxLocation.id,
                    mapLocation: String(e.target.value),
                  })
                }
              />
            </Box>
          );
        },
      },
    ],
    menuActions: [
      {
        name: 'Assign location',
        fn: (nayaxLocationId) => {
          const row = tableData.find((geo) => geo.id === nayaxLocationId);

          openGeographyManagementModal({
            onConfirm: (mapLocationId) => {
              createLocationMapping({
                geographyId: +nayaxLocationId,
                mapLocation: String(mapLocationId),
              });
              closeGeographyManagementModal();
            },
            selectedRegion: row?.map_location
              ? {
                  id: +row.map_location,
                  postcode: row.postcode,
                  value: +row.map_location,
                  name: row.name,
                  map_location: row.map_location,
                }
              : undefined,
          });
        },
      },
    ],
  });

  return <DataTable {...tableProps} />;
};
