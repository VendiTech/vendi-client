import { GrowthPercent } from '@/ui/atoms/GrowthPercent/GrowthPercent';

type Props = {
  percent: number;
};

export const TableGrowthPercent = ({ percent }: Props) => {
  return (
    <GrowthPercent
      sx={{
        gap: 1,
        minWidth: 52,
        fontWeight: 'inherit',
      }}
      percent={percent}
      colorizeText={false}
      arrowPosition={'right'}
      showPercent={false}
    />
  );
};
