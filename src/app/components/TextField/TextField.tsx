import type { TextFieldProps } from './types';

export function TextField({
  className,
  ...props
}: TextFieldProps) {
  return (
    <input className={`bg-slate-200 hover:bg-slate-300 active:bg-slate-400 max-w-[10ch] ${className}`} {...props} />
  );
}
