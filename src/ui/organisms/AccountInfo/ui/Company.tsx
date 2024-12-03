import { Typography } from '@mui/material';
import { InputField } from '@/ui/atoms/InputField';
import { Card } from '@/ui/atoms/Card';

export const Company = ({ operator }: { operator?: string | null }) => {
  return (
    <Card>
      <Typography variant={'lg-medium'}>Company</Typography>
      <InputField label={'Operator'} value={operator ?? ''} disabled />
    </Card>
  );
};
