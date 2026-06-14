import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { TripNavigator } from './TripNavigator';
import { Trip } from '@/types/trip';

const mockTrip: Trip = {
  id: '1',
  destination: 'Paris, France',
  content: 'Itinerary content',
  createdAt: '2023-10-27',
};

describe('TripNavigator', () => {
  it('renders trip destination and metadata', () => {
    render(
      <TripNavigator
        activeTrip={mockTrip}
        activeIndex={0}
        totalTrips={3}
        onNext={() => {}}
        onPrev={() => {}}
      />,
    );
    expect(screen.getByText('Paris, France')).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
    expect(screen.getByText(/2023-10-27/)).toBeInTheDocument();
  });

  it('disables Prev button when at index 0', () => {
    render(
      <TripNavigator
        activeTrip={mockTrip}
        activeIndex={0}
        totalTrips={3}
        onNext={() => {}}
        onPrev={() => {}}
      />,
    );
    expect(screen.getByLabelText(/Previous trip/i)).toBeDisabled();
    expect(screen.getByLabelText(/Next trip/i)).not.toBeDisabled();
  });

  it('disables Next button when at last index', () => {
    render(
      <TripNavigator
        activeTrip={mockTrip}
        activeIndex={2}
        totalTrips={3}
        onNext={() => {}}
        onPrev={() => {}}
      />,
    );
    expect(screen.getByLabelText(/Next trip/i)).toBeDisabled();
    expect(screen.getByLabelText(/Previous trip/i)).not.toBeDisabled();
  });

  it('calls onNext and onPrev when buttons are clicked', () => {
    const handleNext = vi.fn();
    const handlePrev = vi.fn();
    render(
      <TripNavigator
        activeTrip={mockTrip}
        activeIndex={1}
        totalTrips={3}
        onNext={handleNext}
        onPrev={handlePrev}
      />,
    );

    fireEvent.click(screen.getByLabelText(/Next trip/i));
    expect(handleNext).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText(/Previous trip/i));
    expect(handlePrev).toHaveBeenCalled();
  });
});
