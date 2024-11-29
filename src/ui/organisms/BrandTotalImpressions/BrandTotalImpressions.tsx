import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { useGetAccountData } from '@/lib/api';

const data = [3, 4, 5, 4, 4, 2];

export const BrandTotalImpressions = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetAccountData();

  const title = `${user?.data.company_name ?? ''} Total Impressions`;

  return (
    <ChartInfoCard
      title={title}
      subtitle={'all sites'}
      value={'2,31m'}
      startValue={4}
      endValue={21}
      isError={!user || isUserError}
      isLoading={isUserLoading}>
      <LineChart isLoading={isUserLoading} data={data} color={'bad'} />
    </ChartInfoCard>
  );
};
