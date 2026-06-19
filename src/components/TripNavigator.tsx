import React from 'react';
import { FiChevronLeft as ChevronLeft, FiChevronRight as ChevronRight } from 'react-icons/fi';
import { Trip } from '@/types/trip';
import { IoTimeOutline } from 'react-icons/io5'; // For consistency with TripHistory header

interface TripNavigatorProps {
  activeTrip: Trip;
  activeIndex: number;
  totalTrips: number;
  onNext: () => void;
  onPrev: () => void;
}

export const TripNavigator: React.FC<TripNavigatorProps> = React.memo(
  ({ activeTrip, activeIndex, totalTrips, onNext, onPrev }) => {
    return (
      <div className="flex flex-col gap-3 p-3">
        {' '}
        {/* Use consistent padding and structure with TripHistory */}
        <h3 className="px-4 text-xs font-black uppercase tracking-widest text-base-content/60 flex items-center gap-2 mb-2">
          <IoTimeOutline className="w-4 h-4 text-primary" /> Current Trip
        </h3>
        <div className="flex items-center justify-between px-4">
          {' '}
          {/* Removed box styles */}
          <button
            disabled={activeIndex === 0} // Disabled logic for Prev/Next was swapped, corrected.
            onClick={onPrev}
            className="btn btn-ghost btn-circle"
            aria-label="Previous trip"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center max-w-xs md:max-w-md truncate mx-2">
            {' '}
            {/* Added mx-2 for spacing */}
            <div className="font-bold text-sm truncate">{activeTrip.title}</div>
            <div className="text-xs opacity-50 font-mono">
              {activeIndex + 1} / {totalTrips} — {activeTrip.createdAt}
            </div>
          </div>
          <button
            disabled={activeIndex === totalTrips - 1} // Disabled logic for Prev/Next was swapped, corrected.
            onClick={onNext}
            className="btn btn-ghost btn-circle"
            aria-label="Next trip"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  },
);

TripNavigator.displayName = 'TripNavigator';
