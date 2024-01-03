import type { BadgeProps } from './types';

export function Badge({
  className,
  count,
}: BadgeProps) {
  return (
    <div className={`flex items-center justify-center p-4 bg-pink-600 text-slate-50 rounded-[50%] w-6 h-6 scale-75 ${className}`}>{count}</div>
  );
}
