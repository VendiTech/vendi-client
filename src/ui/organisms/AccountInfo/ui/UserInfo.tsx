import { Box, SxProps, Theme, Typography } from '@mui/material';
import { Chip } from '@/ui/atoms/Chip';
import { InputField } from '@/ui/atoms/InputField';
import { BaseSelect } from '@/ui/atoms/Select';
import { Card } from '@/ui/atoms/Card';
import { Flexbox } from '@/ui/atoms/Flexbox';

const flexboxChildrenSx: SxProps<Theme> = {
  minWidth: { mobile: 200, tablet: 300 },
};

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

      <InputField fullWidth label={'User ID'} />

      <Flexbox childrenSx={[flexboxChildrenSx, flexboxChildrenSx]}>
        <InputField fullWidth label={'Name'} />

        <InputField fullWidth label={'Title'} />
      </Flexbox>

      <Flexbox childrenSx={[flexboxChildrenSx, flexboxChildrenSx]}>
        <BaseSelect
          fullWidth
          label={'Function'}
          options={[
            { key: 'admin', value: 'ADMIN' },
            { key: 'user', value: 'USER' },
          ]}
        />

        <BaseSelect
          fullWidth
          label={'Permission'}
          options={[
            { key: 'admin', value: 'Total admin' },
            { key: 'user', value: 'USER' },
          ]}
        />
      </Flexbox>
    </Card>
  );
};
