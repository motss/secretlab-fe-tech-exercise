import { AppRouterContext, AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react';
import { vi } from 'vitest';

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>;
  children: React.ReactNode;
};

/**
 * learn more: https://github.com/vercel/next.js/discussions/48937
 */
export const withMockedNextRouter = ({
  router,
  children,
}: AppRouterContextProviderMockProps) => {
  const mockedRouter: AppRouterInstance = {
    back: vi.fn(),
    forward: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    ...router,
  };

  return (
    <AppRouterContext.Provider value={mockedRouter} >
      {children}
    </AppRouterContext.Provider>
  );
};
