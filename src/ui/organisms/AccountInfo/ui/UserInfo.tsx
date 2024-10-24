import { Box, Grid2, Typography } from '@mui/material';
import { Chip } from '@/ui/atoms/Chip';
import { InputField } from '@/ui/atoms/InputField';
import { BaseSelect } from '@/ui/atoms/Select';
import { Card } from '@/ui/atoms/Card';

export const UserInfo = () => {
  return (
    <Card>
      <Box>
        <Typography variant={'lg-medium'} sx={{ mb: '6px', display: 'flex' }}>
          User Information
        </Typography>

        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Typography variant={'sm-regular'} color={'var(--slate-500)'}>
            Last logged in Today, 16:49
          </Typography>

          <Chip variant={'good'}>Active Now</Chip>
        </Box>
      </Box>

      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <InputField fullWidth label={'User ID'} />
        </Grid2>

        <Grid2 size={6}>
          <InputField fullWidth label={'Name'} />
        </Grid2>

        <Grid2 size={6}>
          <InputField fullWidth label={'Title'} />
        </Grid2>

        <Grid2 size={6}>
          <BaseSelect
            fullWidth
            label={'Function'}
            options={[
              { key: 'admin', value: 'ADMIN' },
              { key: 'user', value: 'USER' },
            ]}
          />
        </Grid2>

        <Grid2 size={6}>
          <BaseSelect
            fullWidth
            label={'Permission'}
            options={[
              { key: 'admin', value: 'Total admin' },
              { key: 'user', value: 'USER' },
            ]}
          />
        </Grid2>
      </Grid2>
    </Card>
  );
};
