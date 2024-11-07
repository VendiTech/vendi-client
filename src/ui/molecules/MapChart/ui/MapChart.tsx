import Box from '@mui/material/Box';
import { locationSales } from '@/assets/mocks/charts';
import { LocationSales } from './LocationSales';
import { Map } from './Map';

export const MapChart = () => {
  return (
    <Box>
      {locationSales.map((item) => (
        <LocationSales key={item.location} {...item} highlightOpacity={0.6} />
      ))}

      <Map />
    </Box>
  );
};
