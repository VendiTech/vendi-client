import FullscreenIcon from '@/assets/icons/Resize.svg';
import ZoomInIcon from '@/assets/icons/SearchGlassPlus.svg';
import ZoomOutIcon from '@/assets/icons/SearchGlassMinus.svg';
import Box from '@mui/material/Box';

type Props = {
  zoomIn: () => void;
  zoomOut: () => void;
};

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
      <FullscreenIcon width={20} height={20} />
      <Box onClick={zoomIn}>
        <ZoomInIcon width={20} height={20} />
      </Box>
      <Box onClick={zoomOut}>
        <ZoomOutIcon width={20} height={20} />
      </Box>
    </Box>
  );
};
