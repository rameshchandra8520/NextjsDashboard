import { render, screen } from '@testing-library/react';
import PizzaLoader from '@/components/ui/PizzaLoader';
import { act } from 'react';

jest.useFakeTimers();

describe('PizzaLoader Component', () => {
  test('renders with default props', () => {
    render(<PizzaLoader />);
    
    // Check if the default message is displayed
    expect(screen.getByText('Pizza is cooking...')).toBeInTheDocument();
    
    // Check if the first step is displayed initially
    expect(screen.getByText('Tossing the dough...')).toBeInTheDocument();
  });
  
  test('renders with custom message', () => {
    render(<PizzaLoader message="Custom loading message" />);
    
    // Check if custom message is displayed
    expect(screen.getByText('Custom loading message')).toBeInTheDocument();
  });
  
  test('cycles through pizza steps', () => {
    render(<PizzaLoader />);
    
    // Initial step
    expect(screen.getByText('Tossing the dough...')).toBeInTheDocument();
    
    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Second step should be displayed
    expect(screen.getByText('Adding tomato sauce...')).toBeInTheDocument();
    
    // Advance timer by another second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Third step should be displayed
    expect(screen.getByText('Sprinkling the cheese...')).toBeInTheDocument();
  });
  
  test('renders in fullScreen mode', () => {
    render(<PizzaLoader fullScreen />);
    
    // Check if the fullScreen wrapper is applied
    expect(screen.getByText('Pizza is cooking...')
      .closest('div')
      .parentElement
      ?.classList.contains('fixed')
    ).toBeTruthy();
  });
  
  test('renders in regular mode by default', () => {
    render(<PizzaLoader />);
    
    // Check if the non-fullScreen wrapper is applied
    expect(screen.getByText('Pizza is cooking...')
      .closest('div')
      ?.classList.contains('flex')
    ).toBeTruthy();
  });
  
  test('cleans up interval on unmount', () => {
    // Spy on clearInterval
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    
    const { unmount } = render(<PizzaLoader />);
    
    // Unmount component
    unmount();
    
    // Check if clearInterval was called at least once
    expect(clearIntervalSpy).toHaveBeenCalled();
    
    // Clean up spy
    clearIntervalSpy.mockRestore();
  });
}); 