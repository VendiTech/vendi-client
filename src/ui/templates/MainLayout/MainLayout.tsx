import { PropsWithChildren, ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Navbar } from '@/ui/molecules/Navbar';

type Props = {
  title: string;
  actions?: ReactNode;
} & PropsWithChildren;

export const MainLayout = (props: Props) => {
  const { children, title, actions } = props;

  return (
    <Container sx={{ maxWidth: '1072px', py: 3 }}>
      <Navbar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant={'lg-medium'}>{title}</Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
            }}>
            {actions}
          </Box>
        </Box>
        {children}
      </Box>
    </Container>
  );
};
