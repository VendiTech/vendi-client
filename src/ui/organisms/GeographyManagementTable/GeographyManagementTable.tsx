import { Box } from '@mui/material';
import { useGetGeographies } from '@/lib/api';
import mapRegions from '@/assets/map/nuts1.json';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGeographyManagementModal } from '@/ui/organisms/GeographyManagementTable/GeographyManagementModal';

export const GeographyManagementTable = () => {
  const { data: nayaxGeographies } = useGetGeographies();

  const regionsOptions = mapRegions.features.map((feature) => ({
    key: feature.id,
    value: String(feature.id),
    displayValue: feature.properties.nuts118nm,
  }));

  const tableData = (nayaxGeographies?.data.items ?? []).map((geo) => ({
    ...geo,
    id: String(geo.id),
  }));

  const queryClient = useQueryClient();

  const saveLocationMapping = (
    nayaxLocationId: string,
    mapRegionId: string,
  ) => {
    // TODO send to BE
    queryClient.setQueryData([QueryKeys.useGetGeographies], (oldData) => {
      if (!oldData) return oldData;

      const newItems = oldData.data.items.map((item) =>
        String(item.id) === nayaxLocationId
          ? { ...item, mapLocation: String(mapRegionId) }
          : item,
      );

      return {
        ...oldData,
        data: {
          ...oldData.data,
          items: newItems,
        },
      };
    });
  };

  const [openGeographyManagementModal, closeGeographyManagementModal] =
    useGeographyManagementModal();

  const tableProps = createTableProps({
    data: tableData,
    columns: [
      { field: 'name', title: 'Nayax location' },
      {
        field: 'id',
        title: 'Map location',
        render: (nayaxLocation) =>
          regionsOptions.find(
            (option) => option.value === String(nayaxLocation.mapLocation),
          )?.displayValue ?? '',
      },
    ],
    menuActions: [
      {
        name: 'Assign location',
        fn: (nayaxLocationId) => {
          const row = tableData.find(geo => geo.id === nayaxLocationId) 
          console.log(row)

          openGeographyManagementModal({
            onConfirm: (mapLocationId) => {
              saveLocationMapping(nayaxLocationId, mapLocationId);
              closeGeographyManagementModal();
            },
            selectedRegion: row?.mapLocation ? {
              id: +row.mapLocation,
              postcode: row.postcode,
              value: +row.mapLocation,
              name: row.name,
            } : undefined
          })
        },
      },
    ],
  });

  return (
    <Box sx={{ mt: 3 }}>
      <DataTable {...tableProps} />
    </Box>
  );
};
