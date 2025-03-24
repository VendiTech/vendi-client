import { Flexbox } from '@/ui/atoms/Flexbox';
import { XlsxUploader } from '@/ui/molecules/XlsxUploader';

export const UploadVendingTemplate = () => {
  const handleNayaxUpload = async (file: File) => {
    console.log(file);
  };
  const handleDataJamUpload = async (file: File) => {
    console.log(file);
  };

  return (
    <Flexbox>
      <XlsxUploader
        sourceSystemName={'Nayax'}
        uploadFile={handleNayaxUpload}
        isFileLoading={false}
        // requiredColumns={['test']}
      />
      <XlsxUploader
        sourceSystemName={'DataJam'}
        uploadFile={handleDataJamUpload}
        isFileLoading={false}
      />
    </Flexbox>
  );
};
