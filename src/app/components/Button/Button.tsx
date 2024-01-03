import type { ButtonProps } from './types';

export function Button({
  children,
  className,
  color,
  ...props
}: ButtonProps) {
  const clr = color ?? 'slate';

  return (
    <button className={`px-4 py-2 bg-${clr}-200 hover:bg-${clr}-300 active:bg-${clr}-400 focus:border-solid,border-2,border-slate-950,rounded-md ${className}`} {...props}>{children}</button>
  );
}
