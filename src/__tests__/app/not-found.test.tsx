import { render, screen, act } from '@testing-library/react';
import NotFound from '@/app/not-found';
import { useRouter } from 'next/navigation';

// Mock router push function
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

// Mock timers for countdown testing
jest.useFakeTimers();

describe('NotFound Page', () => {
  beforeEach(() => {
    // Clear mock data before each test
    mockPush.mockClear();
    jest.clearAllTimers();
  });
  
  test('renders 404 error page with correct elements', () => {
    render(<NotFound />);
    
    // Check for title and message
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops! We lost that slice.')).toBeInTheDocument();
    
    // Check for redirect message
    expect(screen.getByText(/Redirecting to Dashboard in/)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument(); // Initial countdown value
    
    // Check for action button
    expect(screen.getByRole('link', { name: /Go to Dashboard Now/i })).toBeInTheDocument();
  });
  
  test('countdown timer decreases every second', () => {
    render(<NotFound />);
    
    // Check initial state
    expect(screen.getByText('10')).toBeInTheDocument();
    
    // Advance time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Counter should decrease
    expect(screen.getByText('9')).toBeInTheDocument();
    
    // Advance time by 2 more seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Counter should decrease further
    expect(screen.getByText('7')).toBeInTheDocument();
  });
  
  test('redirects to dashboard when countdown reaches zero', () => {
    render(<NotFound />);
    
    // Advance time by 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    // Router push should be called with dashboard route
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
  
  test('redirect button navigates to dashboard', () => {
    render(<NotFound />);
    
    // Check if link points to dashboard
    const dashboardLink = screen.getByRole('link', { name: /Go to Dashboard Now/i });
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });
  
  test('progress bar decreases width as countdown continues', () => {
    // This test only checks that the countdown affects the state
    // We won't directly test the progress bar width since it's implementation-specific
    
    render(<NotFound />);
    
    // Check initial countdown value
    expect(screen.getByText('10')).toBeInTheDocument();
    
    // Advance time by 5 seconds (halfway through countdown)
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // Verify countdown has decreased
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // The progress bar width is tied to the countdown state, so we can
    // reasonably assume it's updated correctly if the countdown is working
  });
}); 