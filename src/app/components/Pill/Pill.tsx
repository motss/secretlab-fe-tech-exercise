import type { PillProps } from './types';

export function Pill({
  as,
  children,
  className,
}: PillProps) {
  const Comp = as ?? 'div';

  return (
    <Comp className={`flex items-center justify-center bg-pink-600 text-slate-50 rounded-3xl ps-1 pe-1 text-sm max-h-6 h-6 max-w-fit ${className}`}>
      {children}
    </Comp>
  );
}
