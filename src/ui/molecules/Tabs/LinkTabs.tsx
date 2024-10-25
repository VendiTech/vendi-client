'use client';

import { Tab, Tabs } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  links: {
    to: string;
    title: string;
  }[];
};

export const LinkTabs = ({ links }: Props) => {
  const pathname = usePathname();

  return (
    <Tabs value={pathname}>
      {links.map((link) => (
        <Tab key={link.to} value={link.to} label={link.title} href={link.to} component={Link} />
      ))}
    </Tabs>
  );
};
