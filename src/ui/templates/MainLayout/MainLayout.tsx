import { PropsWithChildren, ReactNode } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Navbar } from '@/ui/molecules/Navbar';

type Props = {
  title: string;
  actions?: ReactNode;
  gap?: number;
} & PropsWithChildren;

export const MainLayout = (props: Props) => {
  const { children, title, actions, gap = 3 } = props;

  return (
    <Container
      sx={{
        maxWidth: '1152px',
        pr: 3,
        pb: 3,
        pl: {
          mobile: 3,
          desktop: 11,
        },
        pt: {
          mobile: 9,
          desktop: 3,
        },
      }}>
      <Navbar />

      <Stack spacing={gap}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              mobile: 'column',
              desktop: 'row',
            },
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: {
              mobile: undefined,
              desktop: 'center',
            },
            gap: 4,
          }}>
          <Typography variant={'lg-medium'} sx={{minWidth: 150}}>
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>{actions}</Box>
        </Box>
        {children}
      </Stack>
    </Container>
  );
};
