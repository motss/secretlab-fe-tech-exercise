const { format } = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' });

export function formatPrice(value: number) {
  return format(value).replace('$', 'S$');
}
