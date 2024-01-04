import { Pill } from '../Pill/Pill';
import { StarFillIcon } from '../StartFillcon/StarFilIcon';
import type { RatingProps } from './types';

export function Rating({
  className,
  rating,
}: RatingProps) {
  return (
    <Pill className={`gap-1 bg-slate-100 text-slate-950 ps-1 !pe-2 ${className}`}>
      <StarFillIcon fill="#ff9800" />
      {Math.floor(rating)}
    </Pill>
  );
}
