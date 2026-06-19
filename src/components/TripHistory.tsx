import React from 'react';
import { IoTimeOutline, IoTrashOutline } from 'react-icons/io5';
import { Trip } from '@/types/trip';

interface TripHistoryProps {
  trips: Trip[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onDelete: (id: string) => void;
}

export const TripHistory: React.FC<TripHistoryProps> = ({
  trips,
  activeIndex,
  onSelect,
  onDelete,
}) => {
  if (trips.length === 0) {
    return <div className="p-8 text-center opacity-40 italic text-sm">No trips planned yet.</div>;
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <h3 className="px-4 text-xs font-black uppercase tracking-widest text-base-content/60 flex items-center gap-2 mb-2">
        <IoTimeOutline className="w-4 h-4 text-primary" /> Trip History
      </h3>
      <div className="menu menu-md w-full p-0 flex flex-col gap-2">
        {trips.map((trip, index) => (
          <li key={trip.id} className="relative group">
            <button
              onClick={() => onSelect(index)}
              className={`w-full flex flex-col items-start gap-1.5 py-5 px-5 pr-12 rounded-2xl transition-all ${
                activeIndex === index
                  ? 'active bg-primary text-primary-content shadow-xl scale-[1.02]'
                  : 'hover:bg-base-200'
              }`}
            >
              <div className="font-bold text-base text-left leading-snug break-words w-full">
                {trip.title}
              </div>
              <div
                className={`text-xs font-mono font-medium ${
                  activeIndex === index ? 'text-primary-content/80' : 'text-base-content/50'
                }`}
              >
                {trip.createdAt}
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(trip.id);
              }}
              className="btn btn-ghost btn-circle absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-error hover:bg-error/10"
              title="Delete trip"
            >
              <IoTrashOutline className="w-5 h-5" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};
