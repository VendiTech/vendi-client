import { ChangeEvent, useState } from 'react';
import { BaseModal, ModalProps } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';
import { createModalHook } from '@/lib/services/Modals';
import { Box } from '@mui/material';
import { FileUpload } from '@/ui/atoms/FileUpload';

type Props = {
  onConfirm: (file: File) => void;
} & Omit<ModalProps, 'onConfirm'>;

const UploadLogoModal = (props: Props) => {
  const { onConfirm, onClose } = props;

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) return;

    const selectedFile = e.target.files[0];

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleConfirm = () => {
    if (file) {
      onConfirm(file);
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Upload logo'}
      wrapperProps={{}}
      onClose={onClose}
      actionButtons={
        <>
          <Button
            variant={'contained'}
            onClick={handleConfirm}
            disabled={!file}>
            Upload
          </Button>
        </>
      }>
      <FileUpload
        onChange={handleFileChange}
        isPreview={!!preview}
        text={'Select or drag and drop your logo here'}>
        {preview ? (
          <Box
            component="img"
            src={preview}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        ) : null}
      </FileUpload>
    </BaseModal>
  );
};

export const useUploadLogoModal = createModalHook<Props>((props) => (
  <UploadLogoModal {...props} />
));
