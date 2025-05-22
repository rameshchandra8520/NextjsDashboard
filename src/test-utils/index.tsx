import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import AuthProvider from '@/components/auth/AuthProvider';
import ThemeProvider from '@/components/ui/ThemeProvider';
import ToastProvider from '@/components/ui/ToastProvider';

// Custom wrapper with providers for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* ToastProvider doesn't accept children directly, so we need a wrapper */}
        <>
          <ToastProvider />
          <div id="test-wrapper">{children}</div>
        </>
      </AuthProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render }; 