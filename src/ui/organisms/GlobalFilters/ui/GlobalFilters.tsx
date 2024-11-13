import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, SxProps, Theme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import EarthIcon from '@/assets/icons/Earth.svg';
import AdvertisingIcon from '@/assets/icons/Bullhorn.svg';
import ProductIcon from '@/assets/icons/BagShopping.svg';
import DateFromIcon from '@/assets/icons/CalendarEmpty.svg';
import DateToIcon from '@/assets/icons/Calendar.svg';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from '@/lib/constants/date';
import { useGlobalFilters } from '@/ui/organisms/GlobalFilters';
import { DatePicker } from '@/ui/atoms/DatePicker';
import { BaseSelect } from '@/ui/atoms/Select';
import { Button } from '@/ui/atoms/Button';
import { advertisingIdFilters, productFilters } from '../helpers/filters-data';
import { ParamsNames } from '../helpers/params-names';
import { validateDates } from '../helpers/validate-dates';
import { useRegionFilters } from '../helpers/use-region-filters';

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

export const GlobalFilters = (props: Props) => {
  const { showProductFilter, showAdvertisingIdFilter, showClearButton } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { region, dateFrom, dateTo, advertisingId, product } =
    useGlobalFilters();

  const regionFilters = useRegionFilters();

  const updateUrl = useCallback(
    (params: URLSearchParams) => {
      const queryString = params.toString();
      const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(updatedPath);
    },
    [pathname, router],
  );

  const handleClearFilters = () => {
    router.push(pathname);
  };

  const handleParamChange = (
    paramName: string,
    newParamValue: string,
    clearParam: boolean,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (clearParam) {
      params.delete(paramName);
    } else {
      params.set(paramName, newParamValue);
    }

    updateUrl(params);
  };

  const handleDateChange = useCallback(
    (dateFrom: Dayjs | null, dateTo: Dayjs | null) => {
      const { validatedDateFrom, validatedDateTo } = validateDates(
        dateFrom,
        dateTo,
      );

      const params = new URLSearchParams(searchParams);

      params.set(ParamsNames.DateFrom, validatedDateFrom.format(DATE_FORMAT));
      params.set(ParamsNames.DateTo, validatedDateTo.format(DATE_FORMAT));

      updateUrl(params);
    },
    [searchParams, updateUrl],
  );

  useEffect(() => {
    // if (!dateFrom && !dateTo) return

    const { validatedDateFrom, validatedDateTo } = validateDates(
      dateFrom ? dayjs(dateFrom, DATE_FORMAT) : null,
      dateTo ? dayjs(dateTo, DATE_FORMAT) : null,
    );

    handleDateChange(
      dateFrom === null ? dateFrom : validatedDateFrom,
      dateTo === null ? dateTo : validatedDateTo,
    );
  }, [dateTo, dateFrom, handleDateChange]);

  const selectedRegion = region ?? regionFilters[0];
  const selectedAdvertisingId = advertisingId ?? advertisingIdFilters[0];
  const selectedProduct = product ?? productFilters[0];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 2,
        width: '100%',
      }}>
      <Box>
        <BaseSelect
          minWidth={200}
          onChange={(e) =>
            handleParamChange(
              ParamsNames.Region,
              String(e.target.value),
              e.target.value === String(regionFilters[0].id),
            )
          }
          fullWidth
          displayValue={
            regionFilters.find((item) => item.id === +(region ?? 0))?.name ??
            regionFilters[0].name
          }
          InputProps={{
            startAdornment: (
              <Box sx={iconBoxSx}>
                <EarthIcon width={16} height={16} />
              </Box>
            ),
          }}
          options={regionFilters.map((item) => ({
            key: item.id,
            value: String(item.id),
            displayValue: item.name,
          }))}
          value={selectedRegion}
        />
      </Box>

      <Box>
        <DatePicker
          format={DISPLAY_DATE_FORMAT}
          maxDate={dayjs(dateTo)}
          value={dateFrom ? dayjs(dateFrom, DATE_FORMAT) : null}
          placeholder={'Date from'}
          icon={DateFromIcon}
          onChange={(date) =>
            handleDateChange(date, dateTo ? dayjs(dateTo, DATE_FORMAT) : null)
          }
        />
      </Box>

      <Box>
        <DatePicker
          format={DISPLAY_DATE_FORMAT}
          minDate={dayjs(dateFrom)}
          maxDate={dayjs()}
          value={dateTo ? dayjs(dateTo, DATE_FORMAT) : null}
          placeholder={'Date to'}
          icon={DateToIcon}
          onChange={(date) =>
            handleDateChange(
              dateFrom ? dayjs(dateFrom, DATE_FORMAT) : null,
              date,
            )
          }
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
                e.target.value === advertisingIdFilters[0],
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
                e.target.value === productFilters[0],
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
    </Box>
  );
};
