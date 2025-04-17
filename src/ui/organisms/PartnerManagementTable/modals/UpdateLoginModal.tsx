import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseLoginModal } from './BaseLoginModal';
import {
  UpdateLoginSchema,
  useUpdateLoginSchema,
} from '../hooks/useLoginSchema';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useGetUserCompanyLogo } from '@/lib/api';
import { useEffect, useState } from 'react';
import { createImageFromBase64 } from '@/lib/helpers/create-image-from-base64';
import { useGetUser } from '@/lib/api/hooks/users/useGetUser';
import { parsePermissions } from '@/lib/helpers/parse-permissions';

type Props = {
  userId: number;
  onDelete: () => void;
  onResetPassword: () => void;
} & ModalProps;

const UpdateLoginModal = ({ userId, onConfirm, onClose, ...rest }: Props) => {
  const { data: user } = useGetUser(userId);

  const { mutateAsync } = useUpdateUser();
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

  if (!user) return null;

  const defaultValues = {
    ...user.data,
    permissions: parsePermissions(user.data.permissions)
  }
  
  return (
    <BaseLoginModal
      {...rest}
      defaultValues={defaultValues}
      onClose={onClose}
      icon={icon}
      isIconChanged={isIconChanged}
      onIconChange={handleIconChange}
      dirtyOnly
      handler={handler}
      schema={schema}
      title={'Edit login'}
    />
  );
};

export const useUpdateLoginModal = createModalHook<Props>((props) => (
  <UpdateLoginModal {...props} />
));
