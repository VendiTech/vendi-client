import { useFormContext } from 'react-hook-form';
import { IconButton } from '@mui/material';
import CrossIcon from '@/assets/icons/Cross.svg';

type Props = {
  field: string;
  onClear: () => void;
};

export const PartnerManagementClearButton = ({ field, onClear }: Props) => {
  const { setValue } = useFormContext();

  const handleClick = () => {
    setValue(field, [], {
      shouldDirty: true,
    });
    onClear();
  };

  return (
    <IconButton onClick={handleClick} size="small">
      <CrossIcon width={14} height={14} />
    </IconButton>
  );
};
