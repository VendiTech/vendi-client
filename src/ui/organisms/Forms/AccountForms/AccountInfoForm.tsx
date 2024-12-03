/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormWrapper } from '@/lib/providers/FormProvider/FormProvider';
import { Stack } from '@mui/material';
import { Company, UserInfo } from '../../AccountInfo';
import { UserDetail } from '@/lib/generated/api';
import { UpdateAccountSchema } from '.';
import { useAccountSchema } from './hooks/useAccountSchema';

type Props = {
  data?: UserDetail;
};

export const AccountInfoForm = (props: Props) => {
  const { data } = props;

  const schema = useAccountSchema();

  return (
    <FormWrapper
      schema={schema}
      defaultValues={{
        firstname: '',
        lastname: '',
        role: 'user',
        job_title: '',
      }}
      values={data as UpdateAccountSchema}>
      <Stack spacing={2}>
        <Company operator={data?.company_name} />

        <UserInfo data={data} />
      </Stack>
    </FormWrapper>
  );
};
