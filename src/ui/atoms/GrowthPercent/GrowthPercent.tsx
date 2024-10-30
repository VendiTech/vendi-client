import { Box } from '@mui/material';
import ArrowIcon from '@/assets/icons/Arrow.svg';
import { LoadingText } from '@/ui/atoms/LoadingText';

type Props = {
  percent: number;
};

export const GrowthPercent = ({ percent }: Props) => {
  return (
    <LoadingText
      variant={'sm-semibold'}
      color={percent > 0 ? 'var(--green-500)' : 'var(--red-500)'}
      lineHeight={1.5}
      isLoading={!percent}
      sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          transform: percent > 0 ? 'rotate(180deg)' : 'none',
        }}>
        <ArrowIcon width={16} height={16} />
      </Box>
      {Math.abs(Math.round(percent * 10) / 10)}%
    </LoadingText>
  );
};
