import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { SalesVsImpressions } from '@/ui/organisms/SalesVsImpressions';
import { FrequencyOfSalesComparison } from '@/ui/organisms/FrequencyOfSalesComparison';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByMonth } from '@/ui/organisms/ImpressionsByMonth';
import { SecondsOfExposure } from '@/ui/organisms/Exposure';
import { BrandTotalImpressions } from '@/ui/organisms/BrandTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
import { AvgSalesPerVenue } from '@/ui/organisms/AvgSalesPerVenue';
import { MonthOnMonthSummary } from '@/ui/organisms/MonthOnMonthSummary';
import { UnitsSoldComparison } from '@/ui/organisms/UnitsSoldComparison';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const ComparisonTemplate = () => {
  return (
    <>
      <Flexbox>
        <UnitsSoldComparison />

        <AvgSalesPerVenue />

        <SecondsOfExposure />
      </Flexbox>

      <Flexbox>
        <BrandTotalImpressions />

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

      <MonthOnMonthSummary />
    </>
  );
};
