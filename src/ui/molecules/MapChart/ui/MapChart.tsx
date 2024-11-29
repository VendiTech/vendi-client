import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useGetGeographies } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { Card } from '@/ui/atoms/Card';
import { NoData } from '@/ui/atoms/NoData';
import { LocationSales } from './LocationSales';
import { Map } from './Map';
import { RegionData } from '../types';
import { getRegionPostcode } from '../helpers/get-region-postcode';
import { getRegionOpacity } from '../helpers/get-region-opacity';

type Props = {
  title: string;
  subtitle: string;
  isLoading: boolean;
  initialZoom?: number;
  data: { value: number; regionId: number }[];
};

export const MapChart = (props: Props) => {
  const { title, subtitle, isLoading, initialZoom, data } = props;

  const { data: geographies, isError } = useGetGeographies();

  const { region: regionFilter } = useGlobalFilters();

  const regionsData: RegionData[] = useMemo(
    () =>
      data
        .map((item) => {
          const geography = geographies?.data.items.find(
            (geography) => geography.id === item.regionId,
          );

          return {
            id: item.regionId,
            name: geography?.name ?? '',
            postcode:
              getRegionPostcode(String(item.regionId)) ??
              geography?.postcode ??
              '',
            value: item.value,
          };
        })
        .sort((prev, curr) => curr.value - prev.value),
    [data, geographies],
  );

  const total = regionsData.reduce((acc, curr) => acc + curr.value, 0);

  const getSelectedRegion = useCallback(
    () =>
      regionFilter?.length === 1
        ? regionsData.find((item) => String(item.id) === regionFilter[0])
        : undefined,
    [regionFilter, regionsData],
  );

  const [selectedRegions, setSelectedRegions] = useState(getSelectedRegion);

  useEffect(() => {
    setSelectedRegions(getSelectedRegion);
  }, [getSelectedRegion, regionFilter]);

  const selectRegion = useCallback(
    (id: number | string) => {
      const region = regionsData.find(
        (item) => item.id === id || item.postcode === id,
      );

      if (!region) return;

      setSelectedRegions(region);
    },
    [regionsData],
  );

  useEffect(() => {
    selectRegion(+(regionFilter ?? 0));
  }, [regionFilter, selectRegion]);

  const isNoData = isError || !regionsData.length;

  return (
    <Card padding={'large'} sx={{ minHeight: 400, height: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridTemplateRows: 'auto 1fr',
          gap: 3,
          height: '100%', 
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant={'lg-medium'} color={'var(--slate-900)'}>
            {title}
          </Typography>

          {!isNoData ? (
            <LoadingText
              hiddenWhileLoading
              isLoading={isLoading}
              variant={'sm-regular'}
              sx={{
                color: 'var(--slate-500)',
                lineHeight: 1.5,
              }}>
              {subtitle}
            </LoadingText>
          ) : null}
        </Box>

        {!isNoData ? (
          <>
            <Box sx={{ gridRow: 'span 2' }}>
              <Map
                regionsData={regionsData}
                selectedRegion={selectedRegions}
                onSelect={selectRegion}
                initialZoom={initialZoom}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                gap: 1.5,
                p: 1,
                maxHeight: 300,
                overflowY: 'auto',
              }}>
              {regionsData.map((item) => (
                <LocationSales
                  key={item.id}
                  regionData={item}
                  total={total}
                  onSelect={() => selectRegion(item.id)}
                  isSelected={selectedRegions?.id === item.id}
                  getRegionOpacity={() =>
                    getRegionOpacity(item.id, regionsData)
                  }
                />
              ))}
            </Box>
          </>
        ) : (
            <NoData />
        )}
      </Box>
    </Card>
  );
};
