import { Box, SxProps, Theme, Typography } from '@mui/material';
import { ChangeEvent, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  sx?: SxProps<Theme>;
  isPreview?: boolean;
  text?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>;

export const FileUpload = ({
  sx,
  isPreview,
  text,
  onChange,
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
        ...sx,
      }}>
      {children}

      {!isPreview ? (
        <Typography variant={'base-medium'} color={'var(--slate-500)'}>
          {text ?? 'Select or drag and drop your file here'}
        </Typography>
      ) : null}

      <input
        type="file"
        accept="image/*"
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
