import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { FrequencyOfTotalSales } from '@/ui/organisms/FrequencyOfTotalSales';
import { PurchasingHours } from '@/ui/organisms/PurchasingHours';
import { SalesByVenue } from '@/ui/organisms/SalesByVenue';
import { GeographicBreakdown } from '@/ui/organisms/GeographicBreakdown';
import { AdvertisingTable } from '@/ui/organisms/AdvertisingTable';
import { QuantityOfProductsPurchased } from '@/ui/organisms/QuantityOfProductsPurchased';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSalesPerMachines';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const SalesTemplate = () => {
  return (
    <>
      <Flexbox>
        <QuantityOfProductsPurchased />

        <AvgSalesPerMachines />
      </Flexbox>

      <Flexbox>
        <ProductSplit />

        <FrequencyOfTotalSales />

        <PurchasingHours />
      </Flexbox>

      <SalesByVenue />

      <GeographicBreakdown />

      <AdvertisingTable />
    </>
  );
};
