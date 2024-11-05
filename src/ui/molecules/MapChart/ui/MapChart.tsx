import { locationSales } from '@/assets/mocks/charts';
import { LocationSales } from './LocationSales';

export const MapChart = () => {
  return locationSales.map((item) => (
    <LocationSales key={item.location} {...item} highlightOpacity={0.6} />
  ));
};
