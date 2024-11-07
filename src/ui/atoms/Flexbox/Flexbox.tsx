import { Children, PropsWithChildren } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

type Props = {
  childrenSx?: SxProps<Theme>[]
} & PropsWithChildren

export const Flexbox = ({ childrenSx, children }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: {
          mobile: 'column',
          tablet: 'row',
        },
      }}>
      {Children.map(children, (item, i) => (
        <Box
          sx={{
            flexGrow: 1,
            flexBasis: 0,
            minWidth: {
              mobile: 280,
              tablet: 336,
            },
            maxWidth: '100%',
            ...(childrenSx ?? [])[i]
          }}>
          {item}
        </Box>
      ))}
    </Box>
  );
};
