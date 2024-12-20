'use client';

import { forwardRef, HTMLInputTypeAttribute, useState } from 'react';
import { InputAdornment, Stack, TextField } from '@mui/material';
import WarningIcon from '@/assets/icons/WarningIcon.svg';
import ClosedEye from '@/assets/icons/ClosedEye.svg';
import OpenedEye from '@/assets/icons/OpenedEye.svg';
import SearchGlass from '@/assets/icons/SearchGlass.svg';
import { Props } from './types';

const getBaseInputStyle = (
  withLabel?: boolean,
  isDisabled?: boolean,
  isMultiLined?: boolean,
  withPassword?: boolean,
  withSearch?: boolean,
  defaultText?: string,
) => ({
  '& fieldset': {
    display: 'none',
  },

  '& .MuiInputBase-root': {
    height: isMultiLined ? '108px' : withLabel ? '56px' : '32px)',
    minWidth: '300px',
    font: 'var(--sm-regular)',
    boxShadow: ' 0 0 0 1px rgba(202, 196, 208, 1)',
    padding: 0,
    background: !isDisabled ? 'none' : 'var(--slate-050)',
  },

  '&.MuiFormControl-root .MuiInputAdornment-root': {
    opacity: '0',
  },

  '&:hover .MuiInputBase-root:not(.Mui-Mui-error, .Mui-disabled)': {
    boxShadow: ' 0 0 0 1px var(--sky-500)',
  },

  '& .MuiInputBase-root.Mui-focused': {
    boxShadow: ' 0 0 0 1px var(--sky-500)',
  },

  '& .MuiInputBase-root.Mui-error:not(.Mui-disabled)': {
    boxShadow: ' 0 0 0 1px var(--red-500)',
  },
  '& .MuiInputLabel-root.Mui-focused.Mui-error': {
    color: 'var(--red-500)',
  },

  '& .MuiFormLabel-root.MuiInputLabel-root': {
    font: 'var(--sm-regular)',
    color: 'var(--slate-400)',
    ...(!defaultText && { lineHeight: '21px' }),
    transform: withSearch
      ? 'translate(40px, 17.5px) scale(1)'
      : 'translate(12px, 17.5px) scale(1)',

    ...(defaultText && {
      transform: 'translate(12px, calc(56px / 2 - 36px / 2)) scale(1)',
      font: 'var(--xs-semibold)',
    }),
  },
  '& .MuiInputBase-input.MuiOutlinedInput-input:not(.MuiInputBase-inputMultiline)':
    withLabel
      ? {
          transform: 'translate(0, calc(56px/2 - 36px/2)) scale(1)',
          padding: withPassword
            ? 'calc(56px/2 - 21px/2) 40px calc(56px/2 - 21px/2) 12px'
            : withSearch
              ? 'calc(56px/2 - 21px/2) 12px calc(56px/2 - 21px/2) 40px'
              : 'calc(56px/2 - 21px/2) 12px',
        }
      : {
          padding: withPassword
            ? 'calc(32px/2 - 21px/2) 40px calc(32px/2 - 21px/2) 12px'
            : withSearch
              ? 'calc(32px/2 - 21px/2) 12px calc(32px/2 - 21px/2) 40px'
              : 'calc(32px/2 - 21px/2) 12px',
        },

  '& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline': {
    transform: 'translate(0, calc(56px/2 - 36px/2)) scale(1)',
    padding: '0px 12px',
    height: '66px !important',
    overflow: 'auto !important',
  },

  '& .MuiInputLabel-root.MuiFormLabel-filled:not(.Mui-focused)': {
    color: 'var(--slate-500)',
    '&.Mui-error': {
      color: 'var(--red-500)',
    },
  },

  '& .MuiInputLabel-root.Mui-focused, .MuiInputLabel-root.MuiFormLabel-filled':
    {
      transform: withSearch
        ? 'translate(40px, calc(56px/2 - 36px/2)) scale(1)'
        : 'translate(12px, calc(56px/2 - 36px/2)) scale(1)',
      color: 'var(--sky-500)',
      font: 'var(--xs-semibold)',
    },

  '& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
    WebkitTextFillColor: 'var(--slate-900)',
  },

  '& .Mui-error.MuiFormHelperText-root': {
    margin: '8px 0 0 ',
    font: 'var(--xs-regular)',
    lineHeight: '18px',
  },

  '& .MuiInputAdornment-root': {
    padding: 0,
    margin: 0,
    position: 'absolute',
    fill: 'var(--slate-500)',
  },
  '& .MuiSelect-select.MuiSelect-outlined': {
    display: 'flex',
    alignItems: 'center',
  },

  '& .MuiOutlinedInput-root:focus-within .MuiInputAdornment-root': {
    opacity: 1,
  },

  '& .MuiOutlinedInput-root input:not(:placeholder-shown) + .MuiInputAdornment-root':
    {
      opacity: 1,
    },
});

export const InputField = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    withPassword,
    withSearch,
    sx,
    label,
    disabled,
    multiline,
    helperText,
    error,
    type = 'text',
    defaultText,
    ...rest
  } = props;

  const [currentType, setCurrentType] = useState<HTMLInputTypeAttribute>(type);

  const handleChangeCurrentType = () => {
    setCurrentType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  const isPasswordVisible =
    currentType === 'password' ? (
      <ClosedEye width={'18px'} height={'18px'} />
    ) : (
      <OpenedEye width={'18px'} height={'18px'} />
    );

  const helper = error && (
    <Stack direction={'row'} alignItems={'center'} gap={'5px'}>
      <WarningIcon width={16} height={14} style={{ fill: 'var(--red-500)', minWidth: 16 }} />
      {helperText ?? 'Error message'}
    </Stack>
  );

  return (
    <TextField
      name={rest.name}
      ref={ref}
      label={label}
      disabled={disabled}
      multiline={multiline}
      type={currentType}
      slotProps={{
        formHelperText: { component: 'div' },
        input: {
          ...(withSearch && {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ cursor: 'pointer', left: '12px' }}>
                {<SearchGlass width={'18px'} height={'18px'} />}
              </InputAdornment>
            ),
          }),
          ...(!error &&
            withPassword && {
              endAdornment: (
                <InputAdornment
                  onClick={handleChangeCurrentType}
                  position="end"
                  sx={{ cursor: 'pointer', right: '12px' }}>
                  {isPasswordVisible}
                </InputAdornment>
              ),
            }),
        },
      }}
      helperText={helper}
      error={error}
      sx={{
        ...getBaseInputStyle(
          !!label,
          disabled,
          multiline,
          withPassword,
          withSearch,
          defaultText,
        ),
        ...sx,
      }}
      {...rest}
    />
  );
});

InputField.displayName = 'InputField'