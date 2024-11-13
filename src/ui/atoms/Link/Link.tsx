'use client';

import { useSearchParams } from 'next/navigation';
import NextLink, { LinkProps } from 'next/link';
import { forwardRef, PropsWithChildren } from 'react';

type Props = {
  keepSearchParams?: boolean;
} & LinkProps &
  PropsWithChildren;

export const Link = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { href, keepSearchParams = true, children, ...rest } = props;

  const params = useSearchParams();

  const newHref =
    keepSearchParams && typeof href === 'string'
      ? { pathname: href, search: params.toString() }
      : href;

  return (
    <NextLink href={newHref} {...rest} ref={ref}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
