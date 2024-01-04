import type { ComponentProps } from 'react';

export function StarFillIcon({
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
      viewBox="0 0 24 24"
      width={width ?? 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 17.3995L15.8799 19.8549C16.5904 20.3049 17.4599 19.6397 17.2729 18.7984L16.2445 14.1811L19.6756 11.0703C20.302 10.5029 19.9654 9.42682 19.1427 9.35834L14.6271 8.95726L12.8601 4.59428C12.5422 3.80191 11.4578 3.80191 11.1399 4.59428L9.3729 8.94748L4.85727 9.34856C4.03455 9.41703 3.69798 10.4931 4.32437 11.0605L7.7555 14.1713L6.7271 18.7886C6.54012 19.6299 7.40958 20.2951 8.12012 19.8451L12 17.3995Z" />
    </svg>
  );
}
