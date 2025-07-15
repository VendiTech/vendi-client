import { Box } from '@mui/material';
import { useGetGeographies } from '@/lib/api';
import mapRegions from '@/assets/map/nuts1.json';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGeographyManagementModal } from '@/ui/organisms/GeographyManagementTable/GeographyManagementModal';
import { InputField } from '@/ui/atoms/InputField';
import { useState } from 'react';
import SearchIcon from '@/assets/icons/SearchGlass.svg';
import { BaseSelect } from '@/ui/atoms/Select';

export const GeographyManagementTable = () => {
  const { data: nayaxGeographies } = useGetGeographies();

  const [searchTerm, setSearchTerm] = useState('');

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
              (option) => option.value === String(nayaxLocation.mapLocation),
            )?.displayValue ?? '';

          return (
            <Box sx={{ maxWidth: 300 }}>
              <BaseSelect
                options={regionsOptions}
                selectedValue={selectedLocation}
                onChange={(e) =>
                  saveLocationMapping(
                    nayaxLocation.id,
                    e.target.value as string,
                  )
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
              saveLocationMapping(nayaxLocationId, mapLocationId);
              closeGeographyManagementModal();
            },
            selectedRegion: row?.mapLocation
              ? {
                  id: +row.mapLocation,
                  postcode: row.postcode,
                  value: +row.mapLocation,
                  name: row.name,
                }
              : undefined,
          });
        },
      },
    ],
  });

  return (
    <Box sx={{ mt: 3 }}>
      <InputField
        placeholder={'Search'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <Box
                sx={{
                  pl: 1,
                  color: 'var(--slate-500)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <SearchIcon width={14} height={14} />
              </Box>
            ),
          },
        }}
      />

      <DataTable {...tableProps} />
    </Box>
  );
};
