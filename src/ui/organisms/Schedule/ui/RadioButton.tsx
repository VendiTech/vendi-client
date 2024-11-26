import { FormControlLabel, Radio, Typography } from '@mui/material';
import CheckedIcon from '@/assets/icons/RadioChecked.svg';
import UncheckedIcon from '@/assets/icons/RadioUnchecked.svg';

type Props = {
  value: string;
  checked: boolean;
  onCheck?: (value: string) => void 
};

export const RadioButton = (props: Props) => {
  const { value, checked, onCheck } = props;

  return (
    <FormControlLabel
      sx={{
        flex: '1 1 0',
        aspectRatio: 1,
        p: '24px 12px',
        pt: '15px',
        m: 0,
        borderRadius: '6px',
        border: '1px solid',
        borderColor: checked ? 'var(--sky-500)' : 'var(--slate-200)',
        justifyContent: 'center'
      }}
      labelPlacement={'bottom'}
      control={
        <Radio
          onClick={() => onCheck?.(value)}
          checked={checked}
          sx={{ color: 'var(--sky-500)' }}
          checkedIcon={<CheckedIcon width={17} height={17} />}
          icon={<UncheckedIcon width={17} height={17} />}
        />
      }
      label={<Typography variant={'sm-regular'}>{value}</Typography>}
    />
  );
};
