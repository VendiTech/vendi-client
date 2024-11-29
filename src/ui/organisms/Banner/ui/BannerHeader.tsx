import { Box, Typography } from '@mui/material';
import {
  useGetAccountData,
  useGetAdvertsPlayout,
  useGetAvgImpressions,
} from '@/lib/api';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { BannerLogo } from './BannerLogo';

export const BannerHeader = () => {
  const { data: currentUser } = useGetAccountData();
  const { data: impressions, isLoading: isImpressionsLoading } =
    useGetAvgImpressions();
  const { data: advertsPlayout, isLoading: isAdvertsPlayoutLoading } =
    useGetAdvertsPlayout();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        justifyContent: 'space-between',
        flexDirection: {
          mobile: 'column',
          desktop: 'row',
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexGrow: {
            mobile: 1,
            desktop: 0,
          },
        }}>
        {currentUser?.data.company_name ? <BannerLogo /> : null}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '6px',
          }}>
          <Typography variant={'2xl-medium'}>
            {currentUser?.data.company_name ?? 'Vendi+'}
          </Typography>

          {currentUser?.data.company_name ? (
            <Typography variant={'sm-medium'}>
              @{currentUser?.data.company_name}
            </Typography>
          ) : null}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          justifyContent: 'center',
          flexGrow: {
            mobile: 1,
            desktop: 0,
          },
        }}>
        {[
          {
            title: 'Impressions',
            count: String(impressions?.data.total_impressions ?? 0),
            isLoading: isImpressionsLoading,
          },
          {
            title: 'Ad Playouts',
            count: String(advertsPlayout?.data.advert_playouts ?? 0),
            isLoading: isAdvertsPlayoutLoading,
          },
        ].map(({ title, count, isLoading }) => (
          <Box
            key={title}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '10px',
            }}>
            <Typography variant={'sm-medium'}>{title}</Typography>

            <LoadingText
              withOpacity
              isLoading={isLoading}
              variant={'2xl-medium'}>
              {count}
            </LoadingText>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
