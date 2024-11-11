import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, SxProps, Theme } from '@mui/material';
import EarthIcon from '@/assets/icons/Earth.svg';
import CalendarIcon from '@/assets/icons/Calendar.svg';
import AdvertisingIcon from '@/assets/icons/Bullhorn.svg';
import ProductIcon from '@/assets/icons/BagShopping.svg';
import { BaseSelect } from '@/ui/atoms/Select';
import {
  advertisingIdFilters,
  dateRangeFilters,
  productFilters,
  regionFilters,
} from '../helpers/filters-data';
import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '@/ui/organisms/GlobalFilters';
import { Button } from '@/ui/atoms/Button';
import { DatePicker } from '@/ui/atoms/DatePicker/DatePicker';

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
  const { region, range, advertisingId, product } = useGlobalFilters();

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

  const handleClearFilters = () => {
    router.push(pathname);
  };

  const selectedRegion = region ?? regionFilters[0];
  const selectedDateRange = range ?? dateRangeFilters[0];
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
        <BaseSelect
          minWidth={200}
          onChange={(e) =>
            handleParamChange(
              ParamsNames.DateRange,
              String(e.target.value),
              dateRangeFilters,
            )
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <Box sx={iconBoxSx}>
                <CalendarIcon width={14} height={16} />
              </Box>
            ),
          }}
          options={dateRangeFilters.map((item) => ({ key: item, value: item }))}
          value={selectedDateRange}
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

      {showClearButton && (region || range || advertisingId || product) ? (
        <Button size={'small'} onClick={handleClearFilters}>Clear filters</Button>
      ) : null}
    </>
  );
};
