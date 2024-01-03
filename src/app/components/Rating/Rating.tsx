import { RatingIcon } from '../RatingIcon/RatingIcon';
import type { RatingProps } from './types';

export function Rating({
  className,
  rating,
}: RatingProps) {
  return (
    <p className={`flex gap-1 items-end text-sm ${className}`}>
      <RatingIcon fill="#ff9800" width={20} />{Math.floor(rating)}
    </p>
  );
}
