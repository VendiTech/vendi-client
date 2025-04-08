import { usePathname, useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { Button } from '@/ui/atoms/Button';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useValidateDates } from '../helpers/use-validate-dates';
import { DateFromFilter } from './DateFromFilter';
import { DateToFilter } from './DateToFilter';
import { RegionFilter } from './RegionFilter';
import { ProductFilter } from './ProductFIlter';
import { UserFilter } from '@/lib/services/GlobalFilters/ui/UserFilter';

type Props = {
  showRegionFilter?: boolean;
  showProductFilter?: boolean;
  showUserFilter?: boolean;
  showClearButton?: boolean;
};

export const GlobalFilters = (props: Props) => {
  const {
    showRegionFilter = true,
    showProductFilter,
    showUserFilter,
    showClearButton,
  } = props;

  const router = useRouter();
  const pathname = usePathname();
  const { product, user } = useGlobalFilters();

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

      {showProductFilter ? <ProductFilter /> : null}

      {showUserFilter ? <UserFilter /> : null}

      {showClearButton && (user || product) ? (
        <Box sx={{ flexGrow: 0   }}>
          <Button size={'small'} onClick={handleClearFilters}>
            Clear filters
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};
