import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the empty state message', () => {
    render(<EmptyState />);
    expect(screen.getByText(/No active itineraries loaded/i)).toBeInTheDocument();
    expect(screen.getByText(/Generate a route using your client API key/i)).toBeInTheDocument();
  });
});
