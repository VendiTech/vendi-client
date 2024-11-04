import { Purchases } from './charts/Purchases';
import { AvgSales } from './charts/AvgSales';
import { Exposures } from './charts/Exposures';

export const DashboardInfo = () => {
  return (
    <>
      <Purchases />

      <AvgSales />

      <Exposures />
    </>
  );
};
