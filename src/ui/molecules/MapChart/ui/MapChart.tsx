import Box from '@mui/material/Box';
import { locationSales } from '@/assets/mocks/charts';
import { LocationSales } from './LocationSales';
import { Map } from './Map';
import { Card } from '@/ui/atoms/Card';
import { Typography } from '@mui/material';
import { LoadingText } from '@/ui/atoms/LoadingText';

type Props = {
  title: string;
  subtitle: string;
  isLoading: boolean;
  initialZoom?: number;
};

export const MapChart = (props: Props) => {
  const { title, subtitle, isLoading, initialZoom } = props;

  return (
    <Card padding={'large'}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridTemplateRows: 'auto 1fr',
          gap: 3,
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant={'lg-medium'} color={'var(--slate-900)'}>
            {title}
          </Typography>

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
        </Box>

        <Box sx={{ gridRow: 'span 2' }}>
          <Map initialZoom={initialZoom} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1.5,
          }}>
          {locationSales.map((item) => (
            <LocationSales
              key={item.location}
              {...item}
              highlightOpacity={0.6}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
