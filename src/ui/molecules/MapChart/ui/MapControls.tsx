import FullscreenIcon from '@/assets/icons/Resize.svg';
import ZoomInIcon from '@/assets/icons/SearchGlassPlus.svg';
import ZoomOutIcon from '@/assets/icons/SearchGlassMinus.svg';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';

type Props = {
  zoomIn: () => void;
  zoomOut: () => void;
};

const buttonSx: SxProps<Theme> = {
  width: 32,
  height: 32,
  border: '1px solid var(--slate-200)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: 'var(--slate-000)',
  transition: 'background-color 0.2s ease',
  
  '&:hover': {
    backgroundColor: 'var(--slate-050)',
  }
}

export const MapControls = ({ zoomIn, zoomOut }: Props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Box
        sx={{
          ...buttonSx,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}>
        <FullscreenIcon width={16} height={16} />
      </Box>
      <Box
        sx={{
          ...buttonSx,
        }}
        onClick={zoomIn}>
        <ZoomInIcon width={16} height={16} />
      </Box>
      <Box
        sx={{
          ...buttonSx,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
        onClick={zoomOut}>
        <ZoomOutIcon width={16} height={16} />
      </Box>
    </Box>
  );
};
