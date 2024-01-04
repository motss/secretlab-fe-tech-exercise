import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { withMockedNextRouter } from '@/app/__mocks__/withMockedNextRouter';
import { ProductsGridFilters } from './ProductsGridFilters';
import * as toSearchParamsFromFiltersDefault from './helpers/toSearchParamsFromFilters/toSearchParamsFromFilters';
import type { ProductsGridFiltersProps, ProductsGridFiltersState } from './types';

const toSearchParamsFromFilters = vi.spyOn(toSearchParamsFromFiltersDefault, 'toSearchParamsFromFilters');

describe('ProductGridFilters', () => {
  const defaultProps: ProductsGridFiltersProps = {
    categories: [
      'a',
      'b',
    ]
  };
  const ev = userEvent.setup();
  const push = vi.fn();

  it('renders correctly', () => {
    render(
      withMockedNextRouter({
        children: <ProductsGridFilters {...defaultProps} />,
        router: {
          push,
        },
      })
    );

    expect(screen.getByRole('group', { name: 'Filter products by: Sure: Choose filters, then click Filter to refine products.' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Category' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'a' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'b' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Minimum price' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Maximum price' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Minimum rating' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Maximum rating' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
  });

  it('changes category correctly', async () => {
    render(
      withMockedNextRouter({
        children: <ProductsGridFilters {...defaultProps} />,
        router: {
          push,
        },
      })
    );

    ev.selectOptions(screen.getByRole('combobox', { name: 'Category' }), 'a');

    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: 'Category' })).toHaveValue('a');
    });

    ev.click(screen.getByRole('button', { name: 'Filter' }));

    await waitFor(() => {
      expect(toSearchParamsFromFilters).toBeCalledWith({
        category: 'a',
        maxPrice: '',
        maxRating: '',
        minPrice: '',
        minRating: '',
      } satisfies ProductsGridFiltersState);
      expect(push).toBeCalledWith('/?filter.category=a');
    });
  });

  it('changes minPrice correctly', async () => {
    render(
      withMockedNextRouter({
        children: <ProductsGridFilters {...defaultProps} />,
        router: {
          push,
        },
      })
    );

    ev.type(screen.getByRole('spinbutton', { name: 'Minimum price' }), '1');

    await waitFor(() => {
      expect(screen.getByRole('spinbutton', { name: 'Minimum price' })).toHaveValue(1);
    });

    ev.click(screen.getByRole('button', { name: 'Filter' }));

    await waitFor(() => {
      expect(toSearchParamsFromFilters).toBeCalledWith({
        category: '',
        maxPrice: '',
        maxRating: '',
        minPrice: '1',
        minRating: '',
      } satisfies ProductsGridFiltersState);
      expect(push).toBeCalledWith('/?filter.price=1%2C');
    });
  });
});
