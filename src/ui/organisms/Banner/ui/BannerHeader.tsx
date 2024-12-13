import { Box, Typography } from '@mui/material';
import {
  useGetAccountData,
  useGetAdvertsPlayoutStatistic,
  useGetAvgImpressions,
} from '@/lib/api';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { BannerLogo } from './BannerLogo';
import { parseNumber } from '@/lib/helpers/parse-number';

export const BannerHeader = () => {
  const { data: currentUser } = useGetAccountData();
  const {
    data: impressions,
    isLoading: isImpressionsLoading,
    isError: isImpressionsError,
  } = useGetAvgImpressions();
  const {
    data: advertsPlayout,
    isLoading: isAdvertsPlayoutLoading,
    isError: isAvertsPlayoutError,
  } = useGetAdvertsPlayoutStatistic();

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
        <BannerLogo />

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
              @{currentUser?.data.company_name.toLowerCase()}
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
            count: String(
              parseNumber(impressions?.data.impressions ?? 0, true),
            ),
            isLoading: isImpressionsLoading || isImpressionsError,
          },
          {
            title: 'Ad Playouts',
            count: String(parseNumber(advertsPlayout?.data.advert_playouts ?? 0, true)),
            isLoading: isAdvertsPlayoutLoading || isAvertsPlayoutError,
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
