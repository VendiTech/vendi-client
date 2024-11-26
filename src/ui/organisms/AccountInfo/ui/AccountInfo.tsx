import { Stack } from '@mui/material';
import { Company } from '@/ui/organisms/AccountInfo/ui/Company';
import { UserInfo } from '@/ui/organisms/AccountInfo/ui/UserInfo';
import { UserDetail } from '@/lib/generated/api';

type Props = {
  data: UserDetail;
};

export const AccountInfo = (props: Props) => {
  const { data } = props;
  return (
    <Stack spacing={2}>
      <Company operator={data.company_name!} />

      <UserInfo data={data} />
    </Stack>
  );
};
