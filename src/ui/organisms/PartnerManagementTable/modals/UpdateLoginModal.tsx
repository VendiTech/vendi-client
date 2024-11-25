import { UserDetail } from '@/lib/generated/api';
import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseLoginModal } from './BaseLoginModal';
import { UpdateLoginSchema, useUpdateLoginSchema } from '../hooks/useLoginSchema';
import { useUpdateUser } from '../hooks/useUpdateUser';

type Props = {
  userId: number;
  defaultValues: UserDetail;
  onDelete: () => void;
  onResetPassword: () => void;
} & ModalProps;

const UpdateLoginModal = ({ userId, onConfirm, ...rest }: Props) => {
  const { mutateAsync } = useUpdateUser();
  const schema = useUpdateLoginSchema()
  
  const handler = async (params: UpdateLoginSchema) => {
    const response = await mutateAsync({ userId, params });

    onConfirm();

    return response;
  };

  return <BaseLoginModal {...rest} dirtyOnly handler={handler} schema={schema} title={'Edit login'} />;
};

export const useUpdateLoginModal = createModalHook<Props>((props) => (
  <UpdateLoginModal {...props} />
));
