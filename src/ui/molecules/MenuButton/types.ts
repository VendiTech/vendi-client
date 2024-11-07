import { ReactNode } from 'react';

export type MenuAction = {
  name: string;
  fn: () => void;
  critical?: boolean;
};

export type MenuButtonProps = {
  actions: MenuAction[] | ReactNode;
}