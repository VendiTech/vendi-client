import { Stack, Typography } from '@mui/material';
import { Activity } from '@/ui/organisms/Activity';
import { Card } from '@/ui/atoms/Card';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { LoadingContent } from '@/ui/atoms/LoadingContent';
import { useGetAccountData } from '@/lib/api';
import { AccountInfoForm } from '@/ui/organisms/Forms/AccountForms';
import { PartnerManagementTable } from '@/ui/organisms/PartnerManagementTable';

export const AccountsTemplate = () => {
  const { data, isLoading } = useGetAccountData();

  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      <Flexbox childrenSx={[{ flexGrow: 2 }, { flexGrow: 1 }]}>
        <LoadingContent isLoading={isLoading}>
          <AccountInfoForm data={data?.data} />
        </LoadingContent>

        <Activity />
      </Flexbox>

      <Card>
        <Typography variant={'lg-medium'} sx={{ pl: 1 }}>
          Accounts
        </Typography>

        <PartnerManagementTable variant={'accounts'} />
      </Card>
    </Stack>
  );
};
