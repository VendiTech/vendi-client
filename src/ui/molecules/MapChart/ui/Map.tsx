import Box from '@mui/material/Box';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { MapControls } from '@/ui/molecules/MapChart/ui/MapControls';
import { useState } from 'react';

const ZOOM_STEP = 0.01;

export const Map = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <Box sx={{ position: 'relative' }}>
      <ComposableMap>
        <ZoomableGroup scale={zoom} zoom={zoom} maxZoom={1000}>
          <Geographies geography="./maps/topo_lad.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  fill={'var(--sky-500)'}
                  opacity={Math.random()}
                  geography={geo}
                  onMouseEnter={() => console.log(geo)}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <MapControls
        zoomIn={() => setZoom(zoom - ZOOM_STEP)}
        zoomOut={() => setZoom(zoom + ZOOM_STEP)}
      />
    </Box>
  );
};
