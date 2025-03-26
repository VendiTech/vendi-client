import { Box, SxProps, Theme, Typography } from '@mui/material';
import { ChangeEvent, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  sx?: SxProps<Theme>;
  isPreview?: boolean;
  text?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}>;

export const FileUpload = ({
  sx,
  isPreview,
  text,
  onChange,
  accept,
  children,
}: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 200,
        width: '100%',
        border: '1px solid var(--sky-500)',
        borderRadius: 2,
        background: isPreview ? 'var(--slate-200)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
        cursor: 'pointer',
        ...sx,
      }}>
      {!isPreview ? (
        <Typography variant={'base-medium'} color={'var(--slate-500)'}>
          {text ?? 'Select or drag and drop your file here'}
        </Typography>
      ) : (
        children
      )}

      <input
        type="file"
        accept={accept}
        onChange={onChange}
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};
