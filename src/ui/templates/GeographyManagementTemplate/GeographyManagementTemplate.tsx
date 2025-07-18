import { Box, Typography } from '@mui/material';
import { GeographyManagementTable } from '@/ui/organisms/GeographyManagementTable';
import { Card } from '@/ui/atoms/Card';
import { InputField } from '@/ui/atoms/InputField';
import SearchIcon from '@/assets/icons/SearchGlass.svg';
import { useState } from 'react';

export const GeographyManagementTemplate = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box sx={{ mt: 3 }}>
      <InputField
        placeholder={'Search'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <Box
                sx={{
                  pl: 1,
                  color: 'var(--slate-500)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <SearchIcon width={14} height={14} />
              </Box>
            ),
          },
        }}
      />

      <Card>
        <Typography variant={'lg-medium'} sx={{ pl: 1 }}>
          Locations
        </Typography>

        <GeographyManagementTable searchTerm={searchTerm} />
      </Card>
    </Box>
  );
};
