import { PropsWithChildren, ReactNode } from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { Card } from '@/ui/atoms/Card';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { NoData } from '@/ui/atoms/NoData';

type Props = {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
  isError?: boolean;
  actions?: ReactNode;
  sx?: SxProps<Theme>;
} & PropsWithChildren;

export const ChartCard = (props: Props) => {
  const { title, subtitle, isLoading, isError, actions, children, sx } = props;

  return (
    <Card padding={'large'} sx={{ height: '100%', minHeight: 400, ...sx }}>
      {isError ? (
        <NoData />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant={'lg-medium'} color={'var(--slate-900)'}>
                {title}
              </Typography>

              {subtitle ? (
                <LoadingText
                  hiddenWhileLoading
                  isLoading={!!isLoading}
                  variant={'sm-regular'}
                  sx={{
                    color: 'var(--slate-500)',
                    lineHeight: 1.5,
                  }}>
                  {subtitle}
                </LoadingText>
              ) : null}
            </Box>

            {actions && !isLoading ? <Box>{actions}</Box> : null}
          </Box>

          {children}
        </>
      )}
    </Card>
  );
};
