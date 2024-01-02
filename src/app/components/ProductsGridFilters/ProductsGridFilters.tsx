'use client';

import { useRouter } from 'next/navigation';
import { useState, type ComponentProps } from 'react';
import { useMount } from 'react-use';

import { parseProductsSearchParams } from '@/app/helpers/parseProductsSearchParams/parseProductsSearchParams';
import type { ProductsGridFiltersProps } from './types';

type FiltersFormData = Record<
  | 'category'
  | 'minPrice'
  | 'maxPrice'
  | 'minRating'
  | 'maxRating',
  string
>;

const noop = () => { /** no-op */ };

export function ProductsGridFilters({
  categories,
}: ProductsGridFiltersProps) {
  const { push } = useRouter();
  const [formData, setFormData] = useState<FiltersFormData>(
    {
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      maxRating: '',
    }
  );

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = (ev) => {
    ev.preventDefault();

    const {
      category,
      maxPrice,
      maxRating,
      minPrice,
      minRating,
    } = formData;

    const sp = new URLSearchParams({
      ...(category && { 'filter.category': category }),
      ...(minPrice || maxPrice ? { 'filter.price': `${minPrice},${maxPrice}` } : {}),
      ...(minRating || maxRating ? { 'filter.rating': `${minRating},${maxRating}` } : {}),
    });
    sp.sort();

    push(`${window.location.pathname}?${sp}`);
  };

  const handleChange: ComponentProps<'form'>['onChange'] = (ev) => {
    const form = ev.currentTarget;
    const newFormData = Object.fromEntries(new FormData(form)) as FiltersFormData;

    setFormData(newFormData);
  };

  useMount(() => {
    const filters = parseProductsSearchParams(new URL(window.location.href).searchParams);
    const [minPrice, maxPrice] = filters.filter?.price ?? [];
    const [minRating, maxRating] = filters.filter?.rating ?? [];
    const newFormData = {
      category: filters.filter?.category ?? '',
      minPrice: (minPrice ?? -1) === -1 ? '' : String(minPrice),
      maxPrice: (maxPrice ?? Infinity) === Infinity ? '' : String(maxPrice),
      minRating: (minRating ?? -1) === -1 ? '' : String(minRating),
      maxRating: (maxRating ?? Infinity) === Infinity ? '' : String(maxRating),
    };

    setFormData(newFormData);
  });

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <fieldset>
        <legend>Filter products:</legend>

        <select name="category" value={formData.category} onChange={noop}>
          <option key="category" value="">Choose category</option>;
          {categories.map((category) => {
            return (
              <option key={category} value={category}>{category}</option>
            );
          })}
        </select>

        <fieldset>
          <legend>Price</legend>
          <input type="number" name="minPrice" min="0" value={formData.minPrice} onChange={noop} />
          <input type="number" name="maxPrice" min="0" value={formData.maxPrice} onChange={noop} />
        </fieldset>

        <fieldset>
          <legend>Rating</legend>
          <input type="number" name="minRating" min="0" step="0.01" value={formData.minRating} onChange={noop} />
          <input type="number" name="maxRating" min="0" max="5" step="0.01" value={formData.maxRating} onChange={noop} />
        </fieldset>
      </fieldset>

      <button>Filter</button>
    </form>
  );
}
