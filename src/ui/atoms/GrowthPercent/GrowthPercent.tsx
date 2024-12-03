import { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import ArrowIcon from '@/assets/icons/Arrow.svg';
import { LoadingText } from '@/ui/atoms/LoadingText';

type Props = {
  percent: number;
  isLoading?: boolean;
  colorizeText?: boolean;
  arrowPosition?: 'left' | 'right';
  showPercent?: boolean;
  displayValue?: ReactNode;
  sx?: SxProps<Theme>;
};

export const GrowthPercent = (props: Props) => {
  const {
    percent,
    isLoading,
    colorizeText = true,
    arrowPosition = 'left',
    showPercent = true,
    displayValue,
    sx,
  } = props;

  const value =
    displayValue ??
    (showPercent ? Math.abs(Math.round(percent * 10) / 10) + '%' : percent);

  return (
    <LoadingText
      variant={'sm-semibold'}
      color={
        colorizeText
          ? percent > 0
            ? 'var(--green-500)'
            : 'var(--red-500)'
          : 'inherit'
      }
      lineHeight={1.5}
      isLoading={!!isLoading}
      sx={{
        ...sx,
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        flexDirection: arrowPosition === 'left' ? 'row' : 'row-reverse',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          transform: percent > 0 ? 'rotate(180deg)' : 'none',
          color: percent > 0 ? 'var(--green-500)' : 'var(--red-500)',
        }}>
        <ArrowIcon width={16} height={16} />
      </Box>
      {value}
    </LoadingText>
  );
};
