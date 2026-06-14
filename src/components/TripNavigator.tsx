import React from 'react';
import { FiChevronLeft as ChevronLeft, FiChevronRight as ChevronRight } from 'react-icons/fi';
import { Trip } from '@/types/trip';

interface TripNavigatorProps {
  activeTrip: Trip;
  activeIndex: number;
  totalTrips: number;
  onNext: () => void;
  onPrev: () => void;
}

export const TripNavigator: React.FC<TripNavigatorProps> = ({
  activeTrip,
  activeIndex,
  totalTrips,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex items-center justify-between bg-base-100 p-2 rounded-box shadow-md border border-base-300">
      <button
        disabled={activeIndex === totalTrips - 1}
        onClick={onNext}
        className="btn btn-ghost btn-circle"
        aria-label="Next trip"
      >
        <ChevronLeft />
      </button>
      <div className="text-center max-w-xs md:max-w-md truncate">
        <div className="font-bold text-sm truncate">{activeTrip.destination}</div>
        <div className="text-xs opacity-50 font-mono">
          {activeIndex + 1} / {totalTrips} — {activeTrip.createdAt}
        </div>
      </div>
      <button
        disabled={activeIndex === 0}
        onClick={onPrev}
        className="btn btn-ghost btn-circle"
        aria-label="Previous trip"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
