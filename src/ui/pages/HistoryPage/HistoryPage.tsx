'use client';

import { Box, Typography } from '@mui/material';
import { activities } from '@/assets/mocks/activities';
import ExportIcon from '@/assets/icons/Export.svg';
import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { MenuButton } from '@/ui/molecules/MenuButton';
import { BaseSelect } from '@/ui/atoms/Select';
import { AdminTemplate } from '@/ui/templates/AdminTemplate/AdminTemplate';

export const HistoryPage = () => {
  const tableProps = createTableProps({
    data: activities,
    columns: [
      { field: 'text', title: 'Action' },
      { field: 'username', title: 'Name' },
      { field: 'id', title: 'ID' },
      { field: 'approval', title: 'Approval' },
      {
        field: 'date',
        title: 'Date and time',
        render: (item) => (
          <Typography sx={{ color: 'var(--slate-500)', fontSize: 'inherit' }}>
            {parseDate(item.date)}
          </Typography>
        ),
      },
    ],
    tableHeader: (
      <Typography variant={'h5'} sx={{ pl: 1 }}>
        History
      </Typography>
    ),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <BaseSelect
            options={[{ key: 'today', value: 'today' }]}
            label={'Date'}
            placeholder={'Date'}
            size={'small'}
          />
          <BaseSelect
            options={[{ key: 'admin', value: 'admin' }]}
            label={'Admin'}
            placeholder={'Admin'}
            size={'small'}
          />
        </Box>
      </Box>

      <DataTable {...tableProps} />
    </Box>
  );
};
