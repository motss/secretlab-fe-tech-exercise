import type { ComponentProps, ReactNode } from 'react';

export interface PillProps extends ComponentProps<'div'> {
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode | null;
}
