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
    <form className="p-2 py-4 mb-8 bg-slate-50" onSubmit={handleSubmit} onChange={handleChange}>
      <fieldset className="mb-5 ps-2">
        <legend className="mb-4 -ms-2">
          Filter products by:
          <br />
          <i><sup>Sure: Choose filters, then click <b>Filter</b> to refine products.</sup></i>
        </legend>

        <div className="mb-2 xl:mb-4">
          <label htmlFor="category">Category</label>
          <br />
          <select className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400" id="category" name="category" value={formData.category} onChange={noop}>
            <option key="category" value=""></option>;
            {categories.map((category) => {
              return (
                <option key={category} value={category}>{category}</option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-2 xl:mb-4">
          <div>
            <label htmlFor="minPrice">Minimum price</label>
            <br />
            <input className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 max-w-[10ch]" id="minPrice" type="number" name="minPrice" min="0" value={formData.minPrice} onChange={noop} />
          </div>

          <div>
            <label htmlFor="maxPrice">Maximum price</label>
            <br />
            <input className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 max-w-[10ch]" id="maxPrice" type="number" name="maxPrice" min="0" value={formData.maxPrice} onChange={noop} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2 xl:mb-4">
          <div>
            <label htmlFor="minRating">Minimum rating</label>
            <br />
            <input className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 max-w-[10ch]" id="minRati  ng" type="number" name="minRating" min="0" step="0.01" value={formData.minRating} onChange={noop} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="maxRating">Maximum rating</label>
            <input className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 max-w-[10ch]" id="maxRating" type="number" name="maxRating" min="0" max="5" step="0.01" value={formData.maxRating} onChange={noop} />
          </div>
        </div>
      </fieldset>

      <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 focus:border-solid,border-2,border-slate-950,rounded-md">Filter</button>
    </form >
  );
}
