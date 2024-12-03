import { Box, SxProps, Theme, Typography } from '@mui/material';
import { Chip } from '@/ui/atoms/Chip';
import { ControlledInputField, InputField } from '@/ui/atoms/InputField';
import { BaseSelect } from '@/ui/atoms/Select';
import { Card } from '@/ui/atoms/Card';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { StatusEnum, UserDetail } from '@/lib/generated/api';

type Props = {
  data?: UserDetail;
};

const flexboxChildrenSx: SxProps<Theme> = {
  minWidth: { mobile: 200, tablet: 300 },
};

export const UserInfo = (props: Props) => {
  const { data } = props;
  return (
    <Card>
      <Box>
        <Typography variant={'lg-medium'} sx={{ mb: '6px', display: 'flex' }}>
          User Information
        </Typography>

        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Chip
            variant={
              data?.status === StatusEnum.Active
                ? 'good'
                : data?.status === StatusEnum.Deleted
                  ? 'neutral'
                  : 'neutral'
            }>
            {data?.status === StatusEnum.Active
              ? 'Active'
              : data?.status === StatusEnum.Deleted
                ? 'Deleted'
                : 'Suspended'}
          </Chip>
        </Box>
      </Box>

      <Flexbox childrenSx={[flexboxChildrenSx, flexboxChildrenSx]}>
        <InputField
          fullWidth
          label={'User ID'}
          disabled
          value={data?.id ?? ''}
        />

        <ControlledInputField
          fullWidth
          label={'First name'}
          disabled
          name="firstname"
        />
      </Flexbox>

      <Flexbox childrenSx={[flexboxChildrenSx, flexboxChildrenSx]}>
        <ControlledInputField
          fullWidth
          label={'Last name'}
          disabled
          name="lastname"
        />

        <ControlledInputField
          fullWidth
          label={'Title'}
          disabled
          name="job_title"
        />
      </Flexbox>

      <Flexbox childrenSx={[flexboxChildrenSx, flexboxChildrenSx]}>
        <BaseSelect
          fullWidth
          label={'Function'}
          disabled
          value={data?.role ?? 'user'}
          options={[
            { key: 'admin', value: 'ADMIN' },
            { key: 'user', value: 'USER' },
          ]}
        />

        <BaseSelect
          fullWidth
          label={'Permission'}
          disabled
          value={data?.permissions ?? 'any'}
          options={[
            { key: 'admin', value: 'Total admin' },
            { key: 'user', value: 'USER' },
          ]}
        />
      </Flexbox>
    </Card>
  );
};
