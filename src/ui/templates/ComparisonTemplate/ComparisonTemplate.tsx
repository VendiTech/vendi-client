import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { SalesVsImpressions } from '@/ui/organisms/SalesVsImpressions';
import { FrequencyOfSalesComparison } from '@/ui/organisms/FrequencyOfSalesComparison';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByMonth } from '@/ui/organisms/ImpressionsByMonth';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSales';
import { SecondsOfExposure } from '@/ui/organisms/SecondsOfExposure';
import { NordicTotalImpressions } from '@/ui/organisms/NordicTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
import { AvgSalesPerVenue } from '@/ui/organisms/AvgSalesPerVenue';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const ComparisonTemplate = () => {
  return (
    <>
      <Flexbox>
        <AvgSalesPerMachines />
        
        <AvgSalesPerVenue />

        <SecondsOfExposure />
      </Flexbox>

      <Flexbox>
        <NordicTotalImpressions />
        
        <TotalAdvertPlayouts />
      </Flexbox>
      
      <Flexbox>
        <ProductSplit />

        <SalesVsImpressions />
      </Flexbox>

      <FrequencyOfSalesComparison />

      <Flexbox>
        <ImpressionsByMonth />

        <TotalImpressions />
      </Flexbox>
    </>
  );
};
