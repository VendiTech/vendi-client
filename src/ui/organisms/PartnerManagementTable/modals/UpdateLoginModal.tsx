import { UserDetail } from '@/lib/generated/api';
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

type Props = {
  userId: number;
  defaultValues: UserDetail;
  onDelete: () => void;
  onResetPassword: () => void;
} & ModalProps;

const UpdateLoginModal = ({ userId, onConfirm, ...rest }: Props) => {
  const { mutateAsync } = useUpdateUser();
  const schema = useUpdateLoginSchema();
  const { data: logo } = useGetUserCompanyLogo(userId);

  const [icon, setIcon] = useState<File | string | undefined>(logo?.data);
  useEffect(() => {
    setIcon(logo?.data);
  }, [logo?.data]);

  const handler = async (params: UpdateLoginSchema) => {
    const image = await createImageFromBase64(icon);

    const response = await mutateAsync({
      userId,
      params: {
        ...params,
        company_logo_image: image,
      },
    });

    onConfirm();

    return response;
  };
  return (
    <BaseLoginModal
      {...rest}
      icon={icon}
      onIconChange={setIcon}
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
