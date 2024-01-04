import { Pill } from '../Pill/Pill';
import type { BadgeProps } from './types';

export function Badge({
  className,
  count,
}: BadgeProps) {
  return (
    <Pill className={`text-xs h-4 pt-[1px] ${className}`} as='p'>{count}</Pill>
  );
}
