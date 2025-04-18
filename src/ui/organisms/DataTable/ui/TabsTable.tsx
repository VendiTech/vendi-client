import { TabsTableProps } from '../types';
import { Card } from '@/ui/atoms/Card';
import { BasicTab } from '@/ui/atoms/Tabs';
import { DataTable } from '@/ui/organisms/DataTable';
import { Box } from '@mui/material';

export const TabsTable = ({ tabs }: TabsTableProps) => {
  return (
    <Card>
      <BasicTab
        tabLabels={tabs.map((item) => item.title)}
        tabComponents={tabs.map((item) => (
          <Box
            key={item.title}
            sx={{
              mt: 3,
              gap: 3,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <DataTable {...item.tableProps} />
          </Box>
        ))}
      />
    </Card>
  );
};
