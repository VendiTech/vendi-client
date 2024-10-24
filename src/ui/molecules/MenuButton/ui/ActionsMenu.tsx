import MoreIcon from '@/assets/icons/More.svg';
import { MenuButton } from './MenuButton';
import { MenuButtonProps } from '../types';

export const ActionsMenu = (props: MenuButtonProps) => {
  return (
    <MenuButton
      icon
      animationDisabled
      variant={'text'}
      color={'primary'}
      sx={{
        py: '0 !important',
        color: 'var(--slate-900) !important',
      }}
      endIcon={null}
      {...props}>
      <MoreIcon />
    </MenuButton>
  );
};
