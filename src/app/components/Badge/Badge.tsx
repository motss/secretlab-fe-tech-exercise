import type { BadgeProps } from './types';

export function Badge({
  className,
  count,
}: BadgeProps) {
  return (
    <div className={`flex items-center justify-center aspect-video bg-pink-600 text-slate-50 rounded-3xl ps-1 pe-1 text-xs ${className}`}>{count}</div>
  );
}
