import CatchAll from '@/app/[...notFound]/page';
import { notFound } from 'next/navigation';

// Mock the notFound function from next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('CatchAll Component', () => {
  test('calls notFound function when rendered', () => {
    // Render the component
    CatchAll();
    
    // Check if notFound was called
    expect(notFound).toHaveBeenCalled();
  });
}); 