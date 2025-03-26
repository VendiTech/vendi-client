import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FileUpload } from '@/ui/atoms/FileUpload';
import { validateXlsx, XlsxValidationError } from '../helpers/validateXlsx';
import { XlsxFileParams } from '../types';

type Props = {
  sourceSystemName: string;
  uploadFile: (file: File) => Promise<void>;
  isFileLoading: boolean;
  error?: string;
} & XlsxFileParams;

export const XlsxUploader = (props: Props) => {
  const {
    sourceSystemName,
    uploadFile,
    isFileLoading: isNetworkLoading,
    error: networkError,
    ...xlsxFileParams
  } = props;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(networkError);

  useEffect(() => {
    setError(networkError);
  }, [networkError]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    await processFile(file);
  };

  const processFile = async (file: File) => {
    setIsLoading(true);
    setError('');

    try {
      await validateXlsx({ file, ...xlsxFileParams });
      setSelectedFile(file);
    } catch (e) {
      setError(
        e instanceof XlsxValidationError
          ? e.message
          : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    await uploadFile(selectedFile);

    setSelectedFile(null);
  };

  const loading = isLoading || isNetworkLoading;

  return (
    <FileUpload
      onChange={handleFileChange}
      text={`Drag and drop ${sourceSystemName} Excel data here or click to select`}
      isPreview={loading || !!selectedFile || !!error}
      accept={'.xlsx'}
      sx={{ aspectRatio: 1 }}>
      <Box
        sx={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
          gap: 2,
          p: 2,
          cursor: 'pointer',
        }}>
        {loading ? (
          <Typography variant={'base-medium'} color={'var(--slate-500)'}>
            Loading...
          </Typography>
        ) : null}

        {error ? (
          <>
            <Typography variant={'base-medium'} color={'var(--red-500)'}>
              {error}
            </Typography>
            <Typography variant={'base-medium'} color={'var(--red-500)'}>
              Try uploading another file
            </Typography>
          </>
        ) : null}

        {selectedFile && !loading ? (
          <>
            <Typography variant={'base-medium'} color={'var(--slate-500)'}>
              Selected file: {selectedFile.name}
            </Typography>

            <Button variant="contained" onClick={handleUpload}>
              Upload {sourceSystemName} data
            </Button>
          </>
        ) : null}
      </Box>
    </FileUpload>
  );
};
