import { PropsWithChildren, ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Navbar } from '@/ui/molecules/Navbar';

type Props = {
  title: string;
  actions?: ReactNode;
  gap?: number
} & PropsWithChildren;

export const MainLayout = (props: Props) => {
  const { children, title, actions, gap = 3 } = props;

  return (
    <Container
      sx={{
        maxWidth: '1152px',
        pr: 3,
        pl: {
          mobile: 3,
          desktop: 11,
        },
        py: 3,
      }}>
      <Navbar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap,
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
