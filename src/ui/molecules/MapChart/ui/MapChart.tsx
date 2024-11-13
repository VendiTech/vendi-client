import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { GeographyDetailSchema } from '@/lib/generated/api';
import { useGetGeographies } from '@/lib/api';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { Card } from '@/ui/atoms/Card';
import { LocationSales } from './LocationSales';
import { Map } from './Map';

type Props = {
  title: string;
  subtitle: string;
  isLoading: boolean;
  initialZoom?: number;
};

export const MapChart = (props: Props) => {
  const { title, subtitle, isLoading, initialZoom } = props;

  const { data } = useGetGeographies();

  const locations: GeographyDetailSchema[] = data?.data.items ?? [];

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
            p: 1,
            maxHeight: 300,
            overflowY: 'auto',
          }}>
          {locations.map((item) => (
            <LocationSales
              key={item.id}
              location={item.name}
              percent={10}
              highlightOpacity={0.6}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
