import { SxProps, Theme, Box } from '@mui/material';
import FullscreenIcon from '@/assets/icons/Resize.svg';
import ArrowIcon from '@/assets/icons/Arrow.svg';
import ZoomInIcon from '@/assets/icons/SearchGlassPlus.svg';
import ZoomOutIcon from '@/assets/icons/SearchGlassMinus.svg';

type Props = {
  zoomIn: () => void;
  zoomOut: () => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
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
  },
};

const arrowSx: SxProps<Theme> = {
  position: 'absolute',
  scale: 0.75,
  width: 16,
  height: 16,
}

export const MapControls = (props: Props) => {
  const { zoomIn, zoomOut, toggleFullscreen, isFullscreen } = props;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: isFullscreen ? 8 : 0,
        right: isFullscreen ? 8 : 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Box
        sx={{
          ...buttonSx,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        onClick={toggleFullscreen}>
        {isFullscreen ? (
          <Box
            sx={{
              width: 16,
              height: 16,
              position: 'relative'
            }}>
            <Box sx={{
              ...arrowSx,
              bottom: -5,
              left: -5,
              transform: 'rotate(-135deg)'
            }}>
              <ArrowIcon width={16} height={16} />
            </Box>
            <Box sx={{
              ...arrowSx,
              top: -5,
              right: -5,
              transform: 'rotate(45deg)',
            }}>
              <ArrowIcon width={16} height={16} />
             </Box>
           </Box>
        ) : (
          <FullscreenIcon width={16} height={16} />
        )}
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
