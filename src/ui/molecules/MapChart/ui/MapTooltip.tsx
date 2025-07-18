import { Typography } from '@mui/material';
import { Tooltip } from '@/ui/atoms/Tooltip';

type Props = {
  open: boolean;
  anchor: HTMLElement | null;
  value: number | null;
  region: string;
  nayaxRegions: {name: string, value: number}[];
  isPercentValue?: boolean;
};

export const MapTooltip = (props: Props) => {
  const { open, anchor, value, region, nayaxRegions, isPercentValue } = props;

  return (
    <Tooltip open={open} anchor={anchor}>
      {value || value === 0 ? (
        <Typography
          variant={'base-medium'}
          color={'var(--slate-900)'}
          lineHeight={1.5}>
          {Math.round(value * 10) / 10}
          {isPercentValue ? '%' : ''}
        </Typography>
      ) : null}

      <Typography
        variant={'xs-regular'}
        color={'var(--slate-500)'}
        lineHeight={1.5}
        mb={1}>
        {region}
      </Typography>

      {nayaxRegions.map((nayaxRegion) => (
        <Typography
          key={nayaxRegion.name}
          variant={'xs-regular'}
          color={'var(--slate-500)'}
          lineHeight={1}>
          {nayaxRegion.name} : {nayaxRegion.value}
        </Typography>
      ))}
    </Tooltip>
  );
};
