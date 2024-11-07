import { MouseEvent, useLayoutEffect, useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { Button, ButtonProps } from '@/ui/atoms/Button';
import { MenuButtonProps } from '../types';
import ChevronIcon from '@/assets/icons/ChevronRight.svg';

export const MenuButton = (props: MenuButtonProps & ButtonProps) => {
  const { actions, children, ...rest } = props;

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [width, setWidth] = useState(100);

  useLayoutEffect(() => {
    if (!anchor) return;

    setWidth(anchor.clientWidth);
  }, [anchor]);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchor(e.currentTarget);
  };

  const handleItemClick = (e: MouseEvent<HTMLLIElement>, fn: () => void) => {
    e.stopPropagation();
    fn();
    setAnchor(null);
  };

  const handleClose = (e: Event) => {
    e.stopPropagation();
    setAnchor(null);
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        endIcon={
          <span style={{ transform: 'rotate(90deg)' }}>
            <ChevronIcon />
          </span>
        }
        {...rest}>
        {children}
      </Button>

      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        onClose={handleClose}
        open={!!anchor}
        sx={{
          '& .MuiPaper-elevation': {
            borderRadius: 1,
            border: '1px solid var(--slate-200)',
            boxShadow: 'none',
            minWidth: width,
          },
          mt: 0.5,
        }}>
        {Array.isArray(actions)
          ? actions.map((action) => (
              <MenuItem
                key={action.name}
                onClick={(e) => handleItemClick(e, action.fn)}
                sx={{
                  px: 2,
                  py: 1,
                  minHeight: 'auto',
                  color: action.critical
                    ? 'var(--red-500)'
                    : 'var(--slate-900)',
                }}>
                <Typography variant={'sm-regular'}>{action.name}</Typography>
              </MenuItem>
            ))
          : actions}
      </Menu>
    </>
  );
};
