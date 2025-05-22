import React from 'react';
import { render, screen } from '@testing-library/react';
import * as testUtils from '@/test-utils';

const TestComponent = () => (
  <div data-testid="test-component">
    <h1>Test Component</h1>
  </div>
);

describe('Test Utilities', () => {
  test('render function is exported correctly', () => {
    // Check if render function exists
    expect(typeof testUtils.render).toBe('function');
  });
  
  test('test utils exports rendering functionality', () => {
    expect(testUtils).toBeDefined();
    
    render(<TestComponent />);
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });
}); 