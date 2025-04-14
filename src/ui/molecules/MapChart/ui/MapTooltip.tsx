import { Typography } from '@mui/material';
import { Tooltip } from '@/ui/atoms/Tooltip';

type Props = {
  open: boolean;
  anchor: HTMLElement | null;
  value: number | null;
  region: string;
};

export const MapTooltip = (props: Props) => {
  const { open, anchor, value, region } = props;

  return (
    <Tooltip open={open} anchor={anchor}>
      {value || value === 0 ? (
        <Typography
          variant={'base-medium'}
          color={'var(--slate-900)'}
          lineHeight={1.5}>
          {Math.round(value * 10) / 10}
        </Typography>
      ) : null}

      <Typography
        variant={'xs-regular'}
        color={'var(--slate-500)'}
        lineHeight={1.5}>
        {region}
      </Typography>
    </Tooltip>
  );
};
