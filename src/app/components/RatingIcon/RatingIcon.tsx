import type { ComponentProps } from 'react';

export function RatingIcon({
  className,
  width,
  height,
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      height={height ?? 24}
      role="presentation"
      viewBox="0 -960 960 960"
      width={width ?? 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
    </svg>
  );
}
