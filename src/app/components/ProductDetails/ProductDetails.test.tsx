import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { productMock } from '@/app/__mocks__/product-mock';
import { toProductUid } from '@/app/helpers/toProductUid/toProductUid';
import { initialStoreState } from '@/app/store/constants';
import { store } from '@/app/store/store';
import type { AppStoreState } from '@/app/store/types';
import { ProductDetails } from './ProductDetails';
import type { ProductDetailsProps } from './types';

describe('ProductDetails', () => {
  const defaultProps: ProductDetailsProps = {
    product: productMock,
  };
  const ev = userEvent.setup();

  afterEach(() => {
    store.setState((state) => {
      state.cart = initialStoreState.cart;

      return state;
    });
  });

  it('renders correctly', () => {
    render(<ProductDetails {...defaultProps} />);

    expect(screen.getByRole('img', { name: productMock.title })).toBeInTheDocument();
    expect(screen.getByText('Save S$6.26 (15.66% off)')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Brown Perfume' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'S$33.74 S$40.00' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText(productMock.description)).toBeInTheDocument();
    expect(screen.getByText('Attributes')).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'List of product attributes' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Name Value' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Price S$40.00' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Discount percentage 15.66%' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: `Brand ${productMock.brand}` })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: `Category ${productMock.category}` })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: `Stock ${productMock.stock}` })).toBeInTheDocument();

    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  it('renders spinbutton with correct initial value', () => {
    store.setState((state) => {
      state.cart.products = {
        [toProductUid(productMock)]: {
          count: 2,
          discountSubtotal: 0,
          discountTotal: 0,
          product: productMock,
          soldOut: false,
          subtotal: 0,
          total: 0,
        },
      };

      return state;
    });

    render(<ProductDetails {...defaultProps} />);

    expect(screen.getByRole('spinbutton')).toHaveValue(2);
  });

  it('adds product correctly', async () => {
    render(<ProductDetails {...defaultProps} />);

    ev.click(screen.getByRole('button', { name: 'Add to cart' }));

    await waitFor(() => {
      expect(store.getState().cart).toEqual({
        discountTotal: 0,
        products: {
          [toProductUid(productMock)]: {
            count: 1,
            discountSubtotal: 0,
            discountTotal: 0,
            product: productMock,
            soldOut: false,
            subtotal: 0,
            total: 0,
          },
        },
        shouldRecalculate: true,
        subtotal: 0,
        total: 0,
      } satisfies AppStoreState['cart']);
    });
  });

  it('increments product correctly', async () => {
    render(<ProductDetails {...defaultProps} />);

    ev.click(screen.getByRole('button', { name: 'Add to cart' }));
    ev.click(screen.getByRole('button', { name: 'Add to cart' }));

    await waitFor(() => {
      expect(store.getState().cart).toEqual({
        discountTotal: 0,
        products: {
          [toProductUid(productMock)]: {
            count: 2,
            discountSubtotal: 0,
            discountTotal: 0,
            product: productMock,
            soldOut: false,
            subtotal: 0,
            total: 0,
          },
        },
        shouldRecalculate: true,
        subtotal: 0,
        total: 0,
      } satisfies AppStoreState['cart']);
    });
  });

  it('updates quantity value correctly', async () => {
    render(<ProductDetails {...defaultProps} />);

    ev.type(screen.getByRole('spinbutton'), '2');

    await waitFor(() => {
      expect(screen.getByRole('spinbutton')).toHaveValue(12);
    });

    ev.click(screen.getByRole('button', { name: 'Add to cart' }));

    await waitFor(() => {
      expect(store.getState().cart).toEqual({
        discountTotal: 0,
        products: {
          [toProductUid(productMock)]: {
            count: 12,
            discountSubtotal: 0,
            discountTotal: 0,
            product: productMock,
            soldOut: false,
            subtotal: 0,
            total: 0,
          },
        },
        shouldRecalculate: true,
        subtotal: 0,
        total: 0,
      } satisfies AppStoreState['cart']);
    });
  });
});
