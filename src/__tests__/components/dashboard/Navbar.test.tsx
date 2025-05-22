import { render, screen, within, act } from '@testing-library/react';
import Navbar from '@/components/dashboard/Navbar';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

// Mock usePathname hook
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock signOut function
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  signOut: jest.fn(() => Promise.resolve(true)),
  useSession: jest.fn(() => ({
    data: { user: { name: 'Test User', email: 'test@example.com', image: '/test-image.jpg' } },
    status: 'authenticated'
  })),
}));

// Mock toast for testing
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(() => 'toast-id'),
  dismiss: jest.fn(),
}));

// Mock window events
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
});

// Mock timer for testing delays
jest.useFakeTimers();

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    jest.clearAllTimers();
    
    // Set default pathname
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
  });
  
  test('renders navbar with correct links', () => {
    render(<Navbar />);
    
    // Check for logo
    expect(screen.getByText('Pizza Dashboard')).toBeInTheDocument();
    
    // Check for navigation links - use desktop menu links only (the first one)
    const desktopNav = screen.getAllByRole('link', { name: /Home/i })[0];
    expect(desktopNav).toBeInTheDocument();
    expect(desktopNav).toHaveAttribute('href', '/dashboard');
    
    const ordersLink = screen.getAllByRole('link', { name: /Pizza Orders/i })[0];
    expect(ordersLink).toBeInTheDocument();
    expect(ordersLink).toHaveAttribute('href', '/dashboard/orders');
  });
  
  test('highlights active link based on current path', () => {
    // Set pathname to dashboard
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    
    const { rerender } = render(<Navbar />);
    
    // Use getAllByRole and check only the first one (desktop menu)
    const desktopLinks = screen.getAllByRole('link', { name: /Home/i });
    const desktopHomeLink = desktopLinks[0];
    const desktopOrdersLink = screen.getAllByRole('link', { name: /Pizza Orders/i })[0];
    
    // Dashboard should be active
    expect(desktopHomeLink.className).toContain('border-red-500');
    expect(desktopOrdersLink.className).not.toContain('border-red-500');
    
    // Change pathname to orders
    (usePathname as jest.Mock).mockReturnValue('/dashboard/orders');
    
    // Re-render with new pathname
    rerender(<Navbar />);
    
    // Get fresh references after rerender
    const newDesktopHomeLink = screen.getAllByRole('link', { name: /Home/i })[0];
    const newDesktopOrdersLink = screen.getAllByRole('link', { name: /Pizza Orders/i })[0];
    
    // Orders should be active
    expect(newDesktopHomeLink.className).not.toContain('border-red-500');
    expect(newDesktopOrdersLink.className).toContain('border-red-500');
  });
  
  test('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    
    render(<Navbar />);
    
    // Mobile menu should be hidden initially
    const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
    expect(mobileMenu).toHaveClass('max-h-0');
    
    // Click the mobile menu button
    await user.click(screen.getByRole('button', { name: /Open main menu/i }));
    
    // Mobile menu should be visible
    expect(mobileMenu).toHaveClass('max-h-screen');
    
    // Click again to hide
    await user.click(screen.getByRole('button', { name: /Open main menu/i }));
    
    // Mobile menu should be hidden
    expect(mobileMenu).toHaveClass('max-h-0');
  });
  
  test('logout button triggers signOut function', async () => {
    // Mock implementation to call signOut immediately
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 123 as any; // Return a number as the timer ID
    });
    
    const user = userEvent.setup({ delay: null });
    
    render(<Navbar />);
    
    // Find and click the logout button - desktop version (first one)
    const logoutButtons = screen.getAllByText('Logout');
    await act(async () => {
      await user.click(logoutButtons[0]);
    });
    
    // After clicking and timeout mock immediately calls the callback
    expect(signOut).toHaveBeenCalled();
    
    // Clean up mock
    jest.restoreAllMocks();
  });
  
  test('listens for scroll events', () => {
    render(<Navbar />);
    
    // Check if scroll event listener is added
    expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    
    // The test will skip verifying the scroll behavior as it relies on internal state
    // that is difficult to test without modifying the component
  });
  
  test('cleans up event listeners on unmount', () => {
    const { unmount } = render(<Navbar />);
    
    unmount();
    
    // Check if scroll event listener is removed
    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
}); 