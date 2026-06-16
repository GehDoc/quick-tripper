import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { TripHistory } from './TripHistory';
import { Trip } from '@/types/trip';

const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Trip 1',
    createdAt: '2026-06-16',
    prompt: 'Prompt 1',
    content: 'Content 1',
  },
  {
    id: '2',
    title: 'Trip 2',
    createdAt: '2026-06-17',
    prompt: 'Prompt 2',
    content: 'Content 2',
  },
];

describe('TripHistory', () => {
  it('renders a list of trips', () => {
    render(
      <TripHistory trips={mockTrips} activeIndex={0} onSelect={() => {}} onDelete={() => {}} />,
    );
    expect(screen.getByText('Trip 1')).toBeInTheDocument();
    expect(screen.getByText('Trip 2')).toBeInTheDocument();
  });

  it('calls onSelect when a trip is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <TripHistory trips={mockTrips} activeIndex={0} onSelect={handleSelect} onDelete={() => {}} />,
    );
    fireEvent.click(screen.getByText('Trip 2'));
    expect(handleSelect).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when the delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(
      <TripHistory trips={mockTrips} activeIndex={0} onSelect={() => {}} onDelete={handleDelete} />,
    );

    // The delete button is in the list item
    const deleteButtons = screen.getAllByTitle(/Delete trip/i);
    fireEvent.click(deleteButtons[0]);
    expect(handleDelete).toHaveBeenCalledWith('1');
  });

  it('shows empty state when no trips', () => {
    render(<TripHistory trips={[]} activeIndex={0} onSelect={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/No trips planned yet/i)).toBeInTheDocument();
  });
});
