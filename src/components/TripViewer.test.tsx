import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { TripViewer } from './TripViewer';
import { Trip } from '@/types/trip';

const mockTrip: Trip = {
  id: 'trip-1',
  destination: 'Tokyo',
  content:
    '# Tokyo Trip\n\n[Google Maps link](https://www.google.com/maps)\n\n<iframe src="https://www.google.com/maps/embed?pb=1"></iframe>',
  createdAt: '2023-10-27',
};

describe('TripViewer', () => {
  it('renders markdown content correctly', () => {
    render(<TripViewer trip={mockTrip} onDelete={() => {}} />);
    expect(screen.getByText('Tokyo Trip')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Google Maps link/i })).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<TripViewer trip={mockTrip} onDelete={handleDelete} />);

    const deleteBtn = screen.getByTitle(/Remove data entry/i);
    fireEvent.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledWith('trip-1');
  });

  it('renders whitelisted Google Maps iframe', () => {
    const { container } = render(<TripViewer trip={mockTrip} onDelete={() => {}} />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.google.com/maps/embed?pb=1');
  });

  it('blocks unsafe iframes', () => {
    const unsafeTrip = {
      ...mockTrip,
      content: '<iframe src="https://malicious.com"></iframe>',
    };
    const { container } = render(<TripViewer trip={unsafeTrip} onDelete={() => {}} />);
    expect(screen.getByText(/Blocked unsafe iframe/i)).toBeInTheDocument();
    expect(container.querySelector('iframe')).not.toBeInTheDocument();
  });
});
