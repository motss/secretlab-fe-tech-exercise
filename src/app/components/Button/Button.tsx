import type { ButtonProps } from './types';

export function Button({
  children,
  className,
  color,
  disabled,
  ...props
}: ButtonProps) {
  const clr = color ?? 'slate';
  const baseCls = disabled ?
    'bg-slate-100 text-slate-500' :
    `bg-${clr}-200 hover:bg-${clr}-300 active:bg-${clr}-400 focus:border-solid,border-2,border-slate-950`;

  return (
    <button className={`px-4 py-2  rounded-md ${baseCls} ${className}`} disabled={disabled} {...props}>{children}</button>
  );
}
