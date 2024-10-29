import { Divider } from '@mui/material';

export const BannerDivider = () => {
  return (
    <Divider
      orientation={'vertical'}
      variant={'middle'}
      flexItem
      sx={{
        borderStyle: 'dashed',
        borderColor: 'inherit',
      }}
    />
  );
};
