import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

export const MapChart = () => {
  return (
    <ComposableMap>
      <ZoomableGroup zoom={1} maxZoom={1000}>
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
  );
};
