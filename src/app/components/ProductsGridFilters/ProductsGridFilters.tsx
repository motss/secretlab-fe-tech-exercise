'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type ComponentProps } from 'react';

import { initialFiltersState } from './constants';
import { parseSearchParamsIntoFilters } from './helpers/parseSearchParamsIntoFilters/parseSearchParamsIntoFilters';
import { toSearchParamsFromFitlers } from './helpers/toSearchParamsFromFilters/toSearchParamsFromFilters';
import type { ProductsGridFiltersProps, ProductsGridFiltersState } from './types';

const noop = () => { /** no-op */ };

export function ProductsGridFilters({
  categories,
}: ProductsGridFiltersProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ProductsGridFiltersState>(initialFiltersState);

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = (ev) => {
    ev.preventDefault();

    push(`${window.location.pathname}?${toSearchParamsFromFitlers(formData)}`);
  };

  const handleChange: ComponentProps<'form'>['onChange'] = (ev) => {
    const form = ev.currentTarget;
    const newFormData = Object.fromEntries(new FormData(form)) as ProductsGridFiltersState;

    setFormData(newFormData);
  };

  useEffect(() => {
    setFormData(parseSearchParamsIntoFilters(searchParams));
  }, [searchParams]);

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
