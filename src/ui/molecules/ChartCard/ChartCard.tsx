import { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';
import { Card } from '@/ui/atoms/Card';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { ActionsMenu, MenuAction } from '@/ui/molecules/MenuButton';

type Props = {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
  actions?: MenuAction[];
} & PropsWithChildren;

export const ChartCard = (props: Props) => {
  const { title, subtitle, isLoading, actions, children } = props;

  return (
    <Card padding={'large'} sx={{ minHeight: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant={'lg-medium'} color={'var(--slate-900)'}>
            {title}
          </Typography>

          {subtitle ? (
            <LoadingText
              isLoading={!!isLoading}
              variant={'sm-regular'}
              color={'var(--slate-500)'}>
              {subtitle}
            </LoadingText>
          ) : null}
        </Box>

        {actions ? (
          <Box>
            <ActionsMenu actions={actions} />
          </Box>
        ) : null}
      </Box>

      {children}
    </Card>
  );
};
