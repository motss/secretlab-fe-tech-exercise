import type { ComponentProps } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
  color?: 'pink' | 'slate';
}
