import { ImpressionsSalesPlayoutsConvertions } from '@/lib/generated/api';

enum RowTitles {
  Impressions = 'Impressions',
  ChangeOfImpressions = '% change of impressions',
  Sales = 'Sales (in cans)',
  ChangeOfSales = '% change of sales',
  AdvertPlayout = 'Advert playout',
  AvgConversion = 'Avg monthly conversion',
}

export const splitByMonth = (data: ImpressionsSalesPlayoutsConvertions[]) => {
  const timeFrames = data.map((item) => item.time_frame)
  
  
}