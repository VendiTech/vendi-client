import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { CreateLoginSchema, useCreateLoginSchema } from '../hooks/useLoginSchema';
import { useCreateUser } from '../hooks/useCreateUser';
import { BaseLoginModal } from './BaseLoginModal';

const CreateLoginModal = ({ onConfirm, ...rest }: ModalProps) => {
  const { mutateAsync } = useCreateUser();
  const schema = useCreateLoginSchema()
  
  const handler = async (params: CreateLoginSchema) => {
    const response = await mutateAsync(params);

    onConfirm();

    return response;
  };

  return <BaseLoginModal {...rest} defaultValues={{
    lastname: '',
    firstname: '',
    email: '',
    permissions: [],
    machines: [],
    products: [],
  }} handler={handler} schema={schema} title={'Create login'}  />;
};

export const useCreateLoginModal = createModalHook<ModalProps>((props) => (
  <CreateLoginModal {...props} />
));
