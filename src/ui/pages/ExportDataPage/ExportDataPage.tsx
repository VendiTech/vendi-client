'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { ExportDataSalesTemplate } from '@/ui/templates/ExportDataSalesTemplate';
import { ExportDataImpressionsTemplate } from '@/ui/templates/ExportDataImpressionsTemplate';
import { BasicTab } from '@/ui/atoms/Tabs';
import { useRef } from 'react';
import { Box } from '@mui/material';

export const ExportDataPage = () => {
  const tabsLabelsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <MainLayout
      title={'Dataflow center'}
      actions={<Box ref={tabsLabelsContainerRef} />}>
      <BasicTab
        tabLabels={['Sales', 'Impressions']}
        tabLabelsContainer={tabsLabelsContainerRef}
        tabComponents={[
          <ExportDataSalesTemplate key={1} />,
          <ExportDataImpressionsTemplate key={2} />,
        ]}
      />
    </MainLayout>
  );
};
