import Image, { ImageProps } from 'next/image';
import { getBase64Image } from '@/lib/helpers/get-base64-image';
import { Box } from '@mui/material';

type Props = {
  src: File | string;
} & Omit<ImageProps, 'src' | 'alt'>;

export const CompanyLogo = ({ src, width = 20, height = 20 }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        background: 'var(--sky-200)',
        borderRadius: '50%',
        overflow: 'hidden',
        p: '1px',
        width: 'fit-content',
      }}>
      <Image
        width={width}
        height={height}
        src={getBase64Image(src)}
        alt={'Company logo'}
      />
    </Box>
  );
};
