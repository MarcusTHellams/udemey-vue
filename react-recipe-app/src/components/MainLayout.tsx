import { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type MainLayoutProps = {
  as?: keyof HTMLElementTagNameMap;
} & HTMLAttributes<unknown>;

export const MainLayout = ({
  as,
  children,
  className,
  ...rest
}: PropsWithChildren<MainLayoutProps>) => {
  const Component = as ? as : 'main';
  return (
    <Component {...rest} className={cn('container mt-16', className)}>
      {children}
    </Component>
  );
};
