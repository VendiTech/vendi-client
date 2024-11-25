import { UserDetail } from '@/lib/generated/api';
import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseLoginModal } from './BaseLoginModal';
import { useUpdateUser } from '@/lib/api';
import { UpdateLoginSchema } from './useLoginSchema';

type Props = {
  userId: number;
  defaultValues: UserDetail;
  onDelete: () => void;
  onResetPassword: () => void;
} & ModalProps;

const EditLoginModal = ({ userId, onConfirm, ...rest }: Props) => {
  const { mutateAsync } = useUpdateUser();

  const handler = async (params: UpdateLoginSchema) => {
    const response = await mutateAsync({ userId, params });

    onConfirm();

    return response;
  };

  return <BaseLoginModal {...rest} handler={handler} title={'Edit login'} />;
};

export const useEditLoginModal = createModalHook<Props>((props) => (
  <EditLoginModal {...props} />
));
