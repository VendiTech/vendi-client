import { Box } from '@mui/material';
import { Company } from '@/ui/organisms/AccountInfo/ui/Company';
import { UserInfo } from '@/ui/organisms/AccountInfo/ui/UserInfo';

export const AccountInfo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 688px',
        gap: 3,
        flexDirection: 'column',
        maxHeight: 'fit-content',
      }}>
      <Company />

      <UserInfo />
    </Box>
  );
};
