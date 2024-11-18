import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { useGetGeographies } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import regions from '@/assets/map/topo-with-ni.json';
import { MapControls } from './MapControls';
import { MapTooltip } from './MapTooltip';
import { getRegionName } from '../helpers/get-region-name';
import { getRegionPostcode } from '../helpers/get-region-postcode';

const MIN_ZOOM = 15;
const MAX_ZOOM = 150;
const ZOOM_STEP = 1.5;

const CENTER_X = -3;
const CENTER_Y = 55;

const WIDTH = 800;
const ASPECT_RATIO = 0.82;

type Props = {
  initialZoom?: number;
};

export const Map = ({ initialZoom = 1 }: Props) => {
  const { data } = useGetGeographies();
  
  const { region: regionFilter } = useGlobalFilters()
  const selectedRegionId = useMemo(() => getRegionPostcode(regionFilter), [regionFilter])
  
  const [zoom, setZoom] = useState(MIN_ZOOM * initialZoom);

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    CENTER_X,
    CENTER_Y,
  ]);

  const [hoveredRegion, setHoveredRegion] = useState(selectedRegionId);
  const [tooltipValue, setTooltipValue] = useState(0);
  const [tooltipRegion, setTooltipRegion] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipAnchor, setTooltipAnchor] = useState<null | HTMLElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    setHoveredRegion(selectedRegionId);
    setTooltipOpen(false);
  }, [zoom, selectedRegionId]);

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

    setHoveredRegion(selectedRegionId);
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
        setHoveredRegion(selectedRegionId);
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
                      hoveredRegion === geo.id
                        ? 'var(--pink-300)'
                        : 'var(--sky-500)'
                    }
                    stroke={'var(--slate-000)'}
                    strokeWidth={0.01}
                    opacity={
                      hoveredRegion === geo.id
                        ? 0.6
                        : getRegionName(
                              geo.properties['hc-key'],
                              data?.data.items,
                            )
                          ? 0.6
                          : 0.2
                    }
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={(e) => {
                      setHoveredRegion(geo.id);
                      setTooltipRegion(
                        getRegionName(
                          geo.properties['hc-key'],
                          data?.data.items,
                        ) ?? geo.id,
                      );
                      setTooltipValue(12);
                      setTooltipAnchor(e.target as HTMLElement);
                      setTooltipOpen(true);
                    }}
                  />

                  <Marker coordinates={geoCentroid(geo)} />

                  {/*{getRegionName(geo.properties['hc-key'], data?.data.items) ? (*/}
                  {/*  <Marker coordinates={geoCentroid(geo)}>*/}
                  {/*    <text*/}
                  {/*      style={{*/}
                  {/*        pointerEvents: 'none',*/}
                  {/*        userSelect: 'none',*/}
                  {/*        fontSize: '0.7px',*/}
                  {/*        fill: 'var(--slate-500)',*/}
                  {/*      }}>*/}
                  {/*      {getRegionName(*/}
                  {/*        geo.properties['hc-key'],*/}
                  {/*        data?.data.items,*/}
                  {/*      )}*/}
                  {/*    </text>*/}
                  {/*  </Marker>*/}
                  {/*) : null}*/}
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
