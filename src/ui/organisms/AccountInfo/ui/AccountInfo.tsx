import { Stack } from '@mui/material';
import { Company } from '@/ui/organisms/AccountInfo/ui/Company';
import { UserInfo } from '@/ui/organisms/AccountInfo/ui/UserInfo';

export const AccountInfo = () => {
  return (
    <Stack spacing={2}>
      <Company />

      <UserInfo />
    </Stack>
  );
};
