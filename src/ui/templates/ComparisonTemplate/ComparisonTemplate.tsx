import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { SalesVsImpressions } from '@/ui/organisms/SalesVsImpressions';
import { FrequencyOfSalesComparison } from '@/ui/organisms/FrequencyOfSalesComparison';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByMonth } from '@/ui/organisms/ImpressionsByMonth';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSalesPerMachines';
import { SecondsOfExposure } from '@/ui/organisms/SecondsOfExposure';
import { NordicTotalImpressions } from '@/ui/organisms/NordicTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';

export const ComparisonTemplate = () => {
  return (
    <>
      <Flexbox>
        <AvgSalesPerMachines />

        <AvgSalesPerMachines />

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
