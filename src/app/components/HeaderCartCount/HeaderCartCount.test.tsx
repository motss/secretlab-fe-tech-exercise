import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import * as useCalculateCartDefault from '@/app/hooks/useCalculateCart/useCalculateCart';
import * as useIsClientDefault from '@/app/hooks/useIsClient/useIsClient';
import { HeaderCartCount } from './HeaderCartCount';

const useCalculateCart = vi.spyOn(useCalculateCartDefault, 'useCalculateCart');
const useIsClient = vi.spyOn(useIsClientDefault, 'useIsClient');

describe('HeaderCartCount', () => {
  it('renders correctly', () => {
    render(<HeaderCartCount />);

    expect(screen.getByRole('link', { name: '0' })).toBeInTheDocument();
    expect(useCalculateCart).toBeCalled();
    expect(useIsClient).toBeCalled();
  });
});
