import { Fragment, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import regions from '@/assets/map/topo.json';
import { MapControls } from './MapControls';
import { MapTooltip } from './MapTooltip';
import { getRegionName } from '../helpers/get-region-name';

const MIN_ZOOM = 13;
const MAX_ZOOM = 100;

type Props = {
  initialZoom?: number;
};

export const Map = ({ initialZoom = 1 }: Props) => {
  const [zoom, setZoom] = useState(MIN_ZOOM * initialZoom);

  const [hoveredRegion, setHoveredRegion] = useState('');
  const [tooltipValue, setTooltipValue] = useState(0);
  const [tooltipRegion, setTooltipRegion] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipAnchor, setTooltipAnchor] = useState<null | HTMLElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(Math.min(zoom * 1.5, MAX_ZOOM));
  const handleZoomOut = () => setZoom(Math.max(zoom / 1.5, MIN_ZOOM));

  const handleFullscreen = async () => {
    if (!mapRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      setIsFullscreen(false);

      return;
    }

    await mapRef.current.requestFullscreen();
    setIsFullscreen(true);
  };

  return (
    <Box
      ref={mapRef}
      sx={{
        position: 'relative',
        background: 'var(--slate-000)',
      }}>
      <ComposableMap
        height={800 / 0.82}
        projectionConfig={{
          center: [5, 5],
        }}>
        <ZoomableGroup
          scale={zoom / MIN_ZOOM}
          zoom={zoom}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          center={[5, 5]}>
          <Geographies geography={regions}>
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Fragment key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    fill={
                      hoveredRegion === geo.id
                        ? 'var(--pink-300)'
                        : 'var(--sky-500)'
                    }
                    stroke={'var(--slate-000)'}
                    strokeWidth={0.05}
                    opacity={
                      hoveredRegion === geo.id
                        ? 0.6
                        : i % 3 === 0
                          ? 0.6
                          : i % 2 === 0
                            ? 0.2
                            : 0.4
                    }
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={(e) => {
                      setHoveredRegion(geo.id);
                      setTooltipRegion(geo.id);
                      setTooltipValue(12);
                      setTooltipAnchor(e.target as HTMLElement);
                      setTooltipOpen(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredRegion('');
                      setTooltipOpen(false);
                    }}
                  />

                  {getRegionName(geo.id) ? (
                    <Marker coordinates={geoCentroid(geo)} z={1000}>
                      <text
                        textAnchor={geo.id === 'L' ? 'end' : 'middle'}
                        dy={geo.id === 'M' ? -0.5 : geo.id === 'L' ? 0.5 : 0}
                        style={{
                          zIndex: 1000,
                          pointerEvents: 'none',
                          userSelect: 'none',
                          fontSize: '1px',
                          fill: 'var(--slate-500)',
                        }}>
                        {getRegionName(geo.id)}
                      </text>
                    </Marker>
                  ) : null}
                </Fragment>
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <MapControls
        zoomIn={handleZoomIn}
        zoomOut={handleZoomOut}
        toggleFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      <MapTooltip
        open={tooltipOpen}
        anchor={tooltipAnchor}
        value={tooltipValue}
        region={tooltipRegion}
      />
    </Box>
  );
};
