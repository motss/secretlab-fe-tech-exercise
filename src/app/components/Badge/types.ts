import type { ComponentProps } from 'react';

export interface BadgeProps extends ComponentProps<'div'> {
  count: number;
}
