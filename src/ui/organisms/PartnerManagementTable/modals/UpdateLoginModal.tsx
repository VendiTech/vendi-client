import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseLoginModal } from './BaseLoginModal';
import {
  UpdateLoginSchema,
  useUpdateLoginSchema,
} from '../hooks/useLoginSchema';
import { useUpdateUser } from '../hooks/useUpdateUser';
import {
  useAttachAllMachines,
  useAttachAllProducts,
  useGetUserCompanyLogo,
} from '@/lib/api';
import { useEffect, useState } from 'react';
import { createImageFromBase64 } from '@/lib/helpers/create-image-from-base64';
import { useGetUser } from '@/lib/api/hooks/users/useGetUser';

type Props = {
  userId: number;
  onDelete: () => void;
  onResetPassword: () => void;
} & ModalProps;

const UpdateLoginModal = ({ userId, onConfirm, onClose, ...rest }: Props) => {
  const {data: user} = useGetUser(userId);

  const { mutateAsync } = useUpdateUser();
  const { mutateAsync: attachAllMachines } = useAttachAllMachines();
  const { mutateAsync: attachAllProducts } = useAttachAllProducts();
  const schema = useUpdateLoginSchema();
  const { data: logo } = useGetUserCompanyLogo(userId);

  const [icon, setIcon] = useState<File | string | undefined>(logo?.data);
  const [isIconChanged, setIsIconChanged] = useState(false);

  useEffect(() => {
    setIcon(logo?.data);
  }, [logo?.data]);

  const handleIconChange = (file: File | string) => {
    setIcon(file);
    setIsIconChanged(true);
  };

  const handler = async (params: UpdateLoginSchema) => {
    const image = await createImageFromBase64(icon);

    const response = await mutateAsync({
      userId,
      params:
        image && isIconChanged
          ? {
              ...params,
              company_logo_image: image,
            }
          : params,
    });

    onConfirm();

    return response;
  };

  const handleAttachAllMachines = () => {
    onClose();
    attachAllMachines(userId);
  };

  const handleAttachAllProducts = () => {
    onClose();
    attachAllProducts(userId);
  };

  if (!user) return null;
  
  return (
    <BaseLoginModal
      {...rest}
      defaultValues={user.data}
      onClose={onClose}
      icon={icon}
      isIconChanged={isIconChanged}
      onIconChange={handleIconChange}
      dirtyOnly
      handler={handler}
      schema={schema}
      title={'Edit login'}
      onAttachAllMachines={handleAttachAllMachines}
      onAttachAllProducts={handleAttachAllProducts}
    />
  );
};

export const useUpdateLoginModal = createModalHook<Props>((props) => (
  <UpdateLoginModal {...props} />
));
