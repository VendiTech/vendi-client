import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { SalesVsImpressions } from '@/ui/organisms/SalesVsImpressions';
import { FrequencyOfSalesComparison } from '@/ui/organisms/FrequencyOfSalesComparison';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByMonth } from '@/ui/organisms/ImpressionsByMonth';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const ComparisonTemplate = () => {
  return (
    <>
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
