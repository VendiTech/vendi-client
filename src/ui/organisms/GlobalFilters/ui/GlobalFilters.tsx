import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, SxProps, Theme } from '@mui/material';
import EarthIcon from '@/assets/icons/Earth.svg';
import AdvertisingIcon from '@/assets/icons/Bullhorn.svg';
import ProductIcon from '@/assets/icons/BagShopping.svg';
import { BaseSelect } from '@/ui/atoms/Select';
import {
  advertisingIdFilters,
  productFilters,
  regionFilters,
} from '../helpers/filters-data';
import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '@/ui/organisms/GlobalFilters';
import { Button } from '@/ui/atoms/Button';
import { DatePicker } from '@/ui/atoms/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

type Props = {
  showProductFilter?: boolean;
  showAdvertisingIdFilter?: boolean;
  showClearButton?: boolean;
};

const iconBoxSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  color: 'var(--slate-400)',
  pl: 1.5,
};

const DATE_FORMAT = 'YYYY-MM-DD';

export const GlobalFilters = (props: Props) => {
  const { showProductFilter, showAdvertisingIdFilter, showClearButton } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { region, dateFrom, dateTo, advertisingId, product } =
    useGlobalFilters();

  const handleParamChange = (
    paramName: string,
    newParamValue: string,
    allFilters: string[],
  ) => {
    const params = new URLSearchParams(searchParams);

    if (newParamValue === allFilters[0]) {
      params.delete(paramName);
    } else {
      params.set(paramName, newParamValue);
    }

    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  const [dateFromValue, setDateFromValue] = useState<Dayjs | null>(dateFrom ? dayjs(dateFrom, DATE_FORMAT) : null);
  const [dateToValue, setDateToValue] = useState<Dayjs | null>(dateTo ? dayjs(dateTo, DATE_FORMAT) : null);

  const handleDateChange = (
    paramName: ParamsNames.DateFrom | ParamsNames.DateTo,
    date: Dayjs | null,
  ) => {
    if (!date) return;

    let newDate = date.startOf('day');

    if (newDate.isAfter(dayjs())) {
      newDate = dayjs();
    }

    if (paramName === ParamsNames.DateFrom && newDate.isAfter(dayjs(dateTo))) {
      newDate = dayjs(dateTo);
    }

    if (paramName === ParamsNames.DateTo && newDate.isBefore(dayjs(dateFrom))) {
      newDate = dayjs(dateFrom);
    }

    if (paramName === ParamsNames.DateFrom) {
      setDateFromValue(newDate);
    }
    
    if (paramName === ParamsNames.DateTo) {
      setDateToValue(newDate);
    }

    handleParamChange(paramName, newDate.format(DATE_FORMAT), []);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  const selectedRegion = region ?? regionFilters[0];
  const selectedAdvertisingId = advertisingId ?? advertisingIdFilters[0];
  const selectedProduct = product ?? productFilters[0];

  return (
    <>
      <Box>
        <BaseSelect
          minWidth={200}
          onChange={(e) =>
            handleParamChange(
              ParamsNames.Region,
              String(e.target.value),
              regionFilters,
            )
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <Box sx={iconBoxSx}>
                <EarthIcon width={16} height={16} />
              </Box>
            ),
          }}
          options={regionFilters.map((item) => ({ key: item, value: item }))}
          value={selectedRegion}
        />
      </Box>

      <Box>
        <DatePicker
          value={dateFromValue}
          placeholder={'Date from'}
          onChange={(date) => handleDateChange(ParamsNames.DateFrom, date)}
        />
      </Box>

      <Box>
        <DatePicker
          value={dateToValue}
          placeholder={'Date to'}
          onChange={(date) => handleDateChange(ParamsNames.DateTo, date)}
        />
      </Box>

      {showAdvertisingIdFilter ? (
        <Box>
          <BaseSelect
            minWidth={200}
            onChange={(e) =>
              handleParamChange(
                ParamsNames.AdvertisingId,
                String(e.target.value),
                advertisingIdFilters,
              )
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <Box sx={iconBoxSx}>
                  <AdvertisingIcon width={16} height={16} />
                </Box>
              ),
            }}
            options={advertisingIdFilters.map((item) => ({
              key: item,
              value: item,
            }))}
            value={selectedAdvertisingId}
          />
        </Box>
      ) : null}

      {showProductFilter ? (
        <Box>
          <BaseSelect
            minWidth={200}
            onChange={(e) =>
              handleParamChange(
                ParamsNames.Product,
                String(e.target.value),
                productFilters,
              )
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <Box sx={iconBoxSx}>
                  <ProductIcon width={16} height={16} />
                </Box>
              ),
            }}
            options={productFilters.map((item) => ({ key: item, value: item }))}
            value={selectedProduct}
          />
        </Box>
      ) : null}

      {showClearButton && (region || advertisingId || product) ? (
        <Button size={'small'} onClick={handleClearFilters}>
          Clear filters
        </Button>
      ) : null}
    </>
  );
};
