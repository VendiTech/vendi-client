import { Fragment, useEffect, useRef, useState } from 'react';
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

const MIN_ZOOM = 10;
const MAX_ZOOM = 150;
const ZOOM_STEP = 1.5;

const CENTER_X = 5;
const CENTER_Y = 5.5;

const WIDTH = 800;
const ASPECT_RATIO = 0.82;

type Props = {
  initialZoom?: number;
};

export const Map = ({ initialZoom = 1 }: Props) => {
  const [zoom, setZoom] = useState(MIN_ZOOM * initialZoom);

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    CENTER_X,
    CENTER_Y,
  ]);

  const [hoveredRegion, setHoveredRegion] = useState('');
  const [tooltipValue, setTooltipValue] = useState(0);
  const [tooltipRegion, setTooltipRegion] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipAnchor, setTooltipAnchor] = useState<null | HTMLElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    setHoveredRegion('');
    setTooltipOpen(false);
  }, [zoom]);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomRef.current * ZOOM_STEP, MAX_ZOOM);

    zoomRef.current = newZoom;
    setZoom(newZoom);
  };
  const handleZoomOut = () => {
    const newZoom = Math.max(zoomRef.current / ZOOM_STEP, MIN_ZOOM);

    zoomRef.current = newZoom;
    setZoom(newZoom);
  };

  useEffect(() => {
    const handlerExitFullscreen = () => {
      if (document.fullscreenElement) return;

      setIsFullscreen(false);
      setZoom(MIN_ZOOM * initialZoom);
      setMapCenter([CENTER_X, CENTER_Y]);
    };

    document.addEventListener('fullscreenchange', handlerExitFullscreen);

    return () =>
      document.removeEventListener('fullscreenchange', handlerExitFullscreen);
  }, [initialZoom]);

  const handleFullscreen = async () => {
    if (!mapRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();

      return;
    }

    setIsFullscreen(true);
    setZoom(MIN_ZOOM);
    setMapCenter([CENTER_X, CENTER_Y * -0.4]);

    await mapRef.current.requestFullscreen();
  };

  const handleMove = (args: { x: number; y: number; zoom: number }) => {
    zoomRef.current = args.zoom;

    setHoveredRegion('');
    setTooltipOpen(false);
  };

  return (
    <Box
      ref={mapRef}
      sx={{
        position: 'relative',
        background: 'var(--slate-000)',
        '& svg': {
          // height: '100%',
        },
      }}
      onMouseLeave={() => {
        setHoveredRegion('');
        setTooltipOpen(false);
      }}>
      <ComposableMap
        height={WIDTH / ASPECT_RATIO}
        width={WIDTH}
        projectionConfig={{ center: mapCenter, parallels: [0, 0] }}>
        <ZoomableGroup
          scale={zoom / MIN_ZOOM}
          zoom={zoom}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          center={mapCenter}
          onMove={handleMove}>
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
                  />

                  <Marker coordinates={geoCentroid(geo)} />

                  {getRegionName(geo.id) ? (
                    <Marker coordinates={geoCentroid(geo)}>
                      <text
                        textAnchor={geo.id === 'L' ? 'end' : 'middle'}
                        dy={geo.id === 'M' ? -0.5 : geo.id === 'L' ? 0.5 : 0}
                        style={{
                          pointerEvents: 'none',
                          userSelect: 'none',
                          fontSize: '0.7px',
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
