import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import type { AddToCartProps } from './types';

export function AddToCart({
  value,
  stock,
  onInput,
  onClick,
}: AddToCartProps) {
  return (
    <div className="flex items-center gap-x-2">
      <TextField className="p-2" type="number" value={value} min="1" max={stock || 99} onInput={onInput} />
      <Button type="button" onClick={onClick}>Add to cart</Button>
    </div>
  );
}
