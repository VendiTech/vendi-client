import { ReactNode } from 'react';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent/GrowthPercent';

type Props = {
  percent: number;
  showPercent?: boolean;
  displayValue?: ReactNode;
};

export const TableGrowthPercent = (props: Props) => {
  return (
    <GrowthPercent
      sx={{
        gap: 1,
        minWidth: 52,
        fontWeight: 'inherit',
      }}
      colorizeText={false}
      arrowPosition={'right'}
      {...props}
    />
  );
};
