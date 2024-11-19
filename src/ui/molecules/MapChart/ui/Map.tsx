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
import regions from '@/assets/map/topo-with-ni.json';
import { MapControls } from './MapControls';
import { MapTooltip } from './MapTooltip';
import { RegionData } from '../types';
import { getRegionOpacity, RegionOpacity } from '../helpers/get-region-opacity';

const MIN_ZOOM = 15;
const MAX_ZOOM = 300;
const ZOOM_STEP = 1.5;

const CENTER_X = -3;
const CENTER_Y = 55;

const WIDTH = 800;
const ASPECT_RATIO = 0.82;

type Props = {
  regionsData: RegionData[];
  onSelect: (postcode: string) => void;
  selectedRegion?: RegionData;
  initialZoom?: number;
};

export const Map = (props: Props) => {
  const { regionsData, selectedRegion, initialZoom = 1 } = props;

  const [zoom, setZoom] = useState(MIN_ZOOM * initialZoom);

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    CENTER_X,
    CENTER_Y,
  ]);

  const [hoveredRegion, setHoveredRegion] = useState('');
  const [tooltipValue, setTooltipValue] = useState<number | null>(null);
  const [tooltipRegion, setTooltipRegion] = useState('');

  useEffect(() => {
    if (!selectedRegion) return;

    setHoveredRegion(selectedRegion.postcode ?? '');
    setTooltipValue(selectedRegion.value);
    setTooltipRegion(String(selectedRegion.name));
  }, [selectedRegion]);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipAnchor, setTooltipAnchor] = useState<null | HTMLElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(zoom);

  useEffect(() => {
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

    const isHorizontal = window.screen.width > window.screen.height;

    setZoom(isHorizontal ? MIN_ZOOM * 1.5 : MIN_ZOOM);

    setMapCenter([CENTER_X, CENTER_Y]);

    await mapRef.current.requestFullscreen();
  };

  const handleMove = (args: { x: number; y: number; zoom: number }) => {
    zoomRef.current = args.zoom;

    setTooltipOpen(false);
  };

  return (
    <Box
      ref={mapRef}
      sx={{
        height: '100%',
        position: 'relative',
        background: 'var(--slate-000)',
      }}
      onMouseLeave={() => {
        setTooltipOpen(false);
      }}>
      <ComposableMap
        height={isFullscreen ? window.screen.height : WIDTH / ASPECT_RATIO}
        width={isFullscreen ? window.screen.width : WIDTH}
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
              geographies.map((geo) => (
                <Fragment key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    fill={
                      hoveredRegion === geo.id ||
                      selectedRegion?.postcode === geo.id
                        ? 'var(--pink-300)'
                        : 'var(--sky-500)'
                    }
                    stroke={'var(--slate-000)'}
                    strokeWidth={0.01}
                    opacity={
                      hoveredRegion === geo.id ||
                      selectedRegion?.postcode === geo.id
                        ? RegionOpacity.Max
                        : getRegionOpacity(geo.id, regionsData)
                    }
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={(e) => {
                      const regionData = regionsData.find(
                        (item) => item.postcode === geo.id,
                      );
                      
                      setHoveredRegion(geo.id);
                      setTooltipRegion(regionData?.name ?? geo.properties.name);
                      setTooltipValue(regionData?.value ?? null);

                      setTooltipAnchor(e.target as HTMLElement);
                      setTooltipOpen(true);
                    }}
                  />

                  <Marker coordinates={geoCentroid(geo)} />

                  {selectedRegion?.postcode === geo.id ? (
                    <Marker coordinates={geoCentroid(geo)}>
                      <text
                        style={{
                          pointerEvents: 'none',
                          userSelect: 'none',
                          fontSize: '0.7px',
                          fill: 'var(--slate-500)',
                        }}>
                        {selectedRegion?.name}
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
