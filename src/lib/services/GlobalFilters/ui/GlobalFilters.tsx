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
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DatePicker } from '@/ui/atoms/DatePicker';
import { BaseSelect } from '@/ui/atoms/Select';
import { Button } from '@/ui/atoms/Button';
import { advertisingIdFilters } from '../helpers/filters-data';
import { ParamsNames } from '../helpers/params-names';
import { validateDates } from '../helpers/validate-dates';
import { useRegionFilters } from '../helpers/use-region-filters';
import { useProductFilters } from '../helpers/use-product-filters';

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
  const productFilters = useProductFilters();

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
    newParamValue: string | string[],
  ) => {
    const params = new URLSearchParams(searchParams);

    let filteredNewParams = Array.isArray(newParamValue)
      ? [...newParamValue]
      : newParamValue;

    if (
      Array.isArray(filteredNewParams) &&
      newParamValue[newParamValue.length - 1] === '0'
    ) {
      filteredNewParams = '0';
    }

    if (Array.isArray(filteredNewParams) && newParamValue.length > 1) {
      filteredNewParams = filteredNewParams.filter((item) => item !== '0');
    }

    const joinedParamValue = Array.isArray(filteredNewParams)
      ? filteredNewParams.join(',')
      : filteredNewParams;

    if (joinedParamValue === '0') {
      params.delete(paramName);
    } else {
      params.set(paramName, joinedParamValue);
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
    const { validatedDateFrom, validatedDateTo } = validateDates(
      dateFrom ? dayjs(dateFrom, DATE_FORMAT) : null,
      dateTo ? dayjs(dateTo, DATE_FORMAT) : null,
    );

    handleDateChange(
      dateFrom === null ? dateFrom : validatedDateFrom,
      dateTo === null ? dateTo : validatedDateTo,
    );
  }, [dateTo, dateFrom, handleDateChange]);

  const selectedRegions = region ?? [regionFilters[0].id];

  useEffect(() => {
    if (regionFilters.length < 2) return;

    const validatedRegionFilter = region?.filter((item) =>
      regionFilters.find((filter) => String(filter.id) === item),
    );

    const params = new URLSearchParams(searchParams);

    if (!validatedRegionFilter || !validatedRegionFilter.length) {
      params.delete(ParamsNames.Region);
    } else {
      params.set(ParamsNames.Region, validatedRegionFilter.join(','));
    }

    updateUrl(params);
  }, [region, regionFilters, searchParams, updateUrl]);

  const selectedAdvertisingId = advertisingId ?? advertisingIdFilters[0];
  const selectedProduct = product ?? String(productFilters[0].id);

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
          multiple
          minWidth={200}
          showSearch
          onChange={(e) =>
            handleParamChange(ParamsNames.Region, e.target.value as string[])
          }
          fullWidth
          displayValue={
            region
              ? regionFilters
                  .filter((item) => region.includes(String(item.id)))
                  .map((item) => item.name)
                  .join(', ')
              : regionFilters[0].name
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
          value={selectedRegions}
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
              handleParamChange(ParamsNames.Product, String(e.target.value))
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <Box sx={iconBoxSx}>
                  <ProductIcon width={16} height={16} />
                </Box>
              ),
            }}
            options={productFilters.map((item) => ({
              key: item.id,
              value: String(item.id),
              displayValue: item.name,
            }))}
            value={selectedProduct}
            displayValue={
              productFilters.find((item) => item.id === +selectedProduct)?.name
            }
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
