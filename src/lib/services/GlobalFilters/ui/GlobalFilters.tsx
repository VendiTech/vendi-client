import { usePathname, useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { Button } from '@/ui/atoms/Button';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useValidateDates } from '../helpers/use-validate-dates';
import { AdvertisingFilter } from './AdvertisingFilter';
import { DateFromFilter } from './DateFromFilter';
import { DateToFilter } from './DateToFilter';
import { RegionFilter } from './RegionFilter';
import { ProductFilter } from './ProductFIlter';

type Props = {
  showRegionFilter?: boolean;
  showProductFilter?: boolean;
  showAdvertisingIdFilter?: boolean;
  showClearButton?: boolean;
};

export const GlobalFilters = (props: Props) => {
  const {
    showRegionFilter = true,
    showProductFilter,
    showAdvertisingIdFilter,
    showClearButton,
  } = props;

  const router = useRouter();
  const pathname = usePathname();
  const { region, advertisingId, product } = useGlobalFilters();

  const handleClearFilters = () => {
    router.push(pathname);
  };

  useValidateDates();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 2,
        width: '100%',
      }}>
      {showRegionFilter ? <RegionFilter /> : null}

      <DateFromFilter />

      <DateToFilter />

      {showAdvertisingIdFilter ? <AdvertisingFilter /> : null}

      {showProductFilter ? <ProductFilter /> : null}

      {showClearButton && (region || advertisingId || product) ? (
        <Button size={'small'} onClick={handleClearFilters}>
          Clear filters
        </Button>
      ) : null}
    </Box>
  );
};
