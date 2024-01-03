import type { ComponentProps } from 'react';

export interface RatingProps extends ComponentProps<'p'> {
  rating: number;
}
