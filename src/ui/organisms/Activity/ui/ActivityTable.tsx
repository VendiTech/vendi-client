import { useState } from 'react';
import { Typography } from '@mui/material';
import { parseDate } from '@/lib/helpers/parse-date';
import { useGetActivityLog } from '@/ui/organisms/Activity/api/useGetActivityLog';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { getActivityUsername } from '@/ui/organisms/Activity/helpers/getActivityUsername';
import { getActivityContent } from '@/ui/organisms/Activity/helpers/getActivityContent';
import { Card } from '@/ui/atoms/Card';

export const ActivityTable = () => {
  const { data } = useGetActivityLog();

  const [selectedActivityId, setSelectedActivityId] = useState('');

  const activities = data?.data.items ?? [];

  const parsedActivities = activities.map((item) => ({
    id: String(item.id),
    content: getActivityContent(item),
    username: getActivityUsername(item),
    date: item.created_at,
  }));

  const onRowClick = (id: string) => {
    if (selectedActivityId === id) {
      setSelectedActivityId('');

      return;
    }

    setSelectedActivityId(id);
  };

  const tableProps = createTableProps({
    data: parsedActivities,
    actionsHidden: true,
    onRowClick,
    columns: [
      { field: 'username', title: 'Name' },
      {
        field: 'content',
        title: 'Action',
        render: (item) => (
          <Typography
            sx={{
              fontSize: 'inherit',
              textWrap: item.id === selectedActivityId ? 'wrap' : 'nowrap',
              overflow: 'hidden',
              maxWidth: 300,
              textOverflow: 'ellipsis',
            }}>
            {item.content}
          </Typography>
        ),
      },
      { field: 'id', title: 'ID' },
      {
        field: 'date',
        title: 'Date and time',
        render: (item) => (
          <Typography sx={{ color: 'var(--slate-500)', fontSize: 'inherit' }}>
            {parseDate(new Date(item.date))}
          </Typography>
        ),
      },
    ],
  });

  return (
    <Card>
      <Typography variant={'lg-medium'} sx={{ pl: 1 }}>
        History
      </Typography>

      <DataTable {...tableProps} />
    </Card>
  );
};
