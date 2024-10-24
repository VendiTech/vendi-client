import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  SxProps,
  Theme,
} from '@mui/material';

export type ButtonProps = MuiButtonProps & {
  icon?: boolean;
  animationDisabled?: boolean;
};

const getBaseButtonStyles = (
  sx?: SxProps<Theme>,
  icon?: boolean,
  animationDisabled?: boolean,
): SxProps<Theme> => ({
  textTransform: 'none',
  fontSize: '14px',
  lineHeight: '21px',
  borderRadius: '6px',
  minWidth: icon ? 'fit-content' : '64px',

  '&.MuiButton-containedPrimary': {
    color: 'var(--slate-000)',
    background:
      'linear-gradient(88.96deg, var(--sky-500) 22.12%, var(--sky-500) 101.19%)',

    '&:hover, &.Mui-focusVisible': {
      background: icon ? 'var(--gradient-rotated)' : 'var(--gradient)',

      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  },

  '&.MuiButton-outlinedPrimary': {
    color: 'var(--slate-900)',

    '&:hover': {
      color: 'var(--slate-500)',
    },
  },

  '&.MuiButton-textPrimary': {
    color: 'var(--sky-500)',
  },

  '&.MuiButton-colorSecondary': {
    color: 'var(--red-500)',
  },

  '&.MuiButton-containedSecondary': {
    color: 'var(--slate-000)',
    background: 'var(--red-500)',
  },

  '&.MuiButton-outlined': {
    borderColor: 'var(--slate-200)',

    '&:hover': {
      background: 'transparent',
    },
  },

  '&.Mui-disabled': {
    color: 'var(--slate-300)',

    '&.MuiButton-contained ': {
      background: 'var(--slate-100)',
    },
  },

  '&.MuiButton-sizeLarge': {
    borderRadius: '8px',
    padding: icon ? '15px' : '12.5px 16px',

    '& svg': {
      width: '16px',
      height: '16px',
    },
  },

  '&.MuiButton-sizeMedium': {
    padding: icon ? '13px' : '9.5px 16px',

    '& svg': {
      width: '14px',
      height: '14px',
    },
  },

  '&.MuiButton-sizeSmall': {
    padding: icon ? '13px' : '5.5px 12px',

    '& svg': {
      width: '12px',
      height: '12px',
    },
  },

  '& .MuiTouchRipple-root': animationDisabled ? { display: 'none' } : null,

  '&:hover': animationDisabled ? { background: 'none' } : null,

  ...(sx ?? {}),
});

export const Button = (props: ButtonProps
) => {
  const { icon, animationDisabled, sx, ...rest } = props;

  return (
    <MuiButton
      sx={getBaseButtonStyles(sx, icon, animationDisabled)}
      {...rest}
    />
  );
};
