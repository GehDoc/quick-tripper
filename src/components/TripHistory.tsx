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
    <div className="flex flex-col gap-2 p-2">
      <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 flex items-center gap-2 mb-2">
        <IoTimeOutline className="w-3 h-3" /> Trip History
      </h3>
      <div className="menu menu-md w-full p-0 flex flex-col gap-1">
        {trips.map((trip, index) => (
          <li key={trip.id} className="relative group">
            <button
              onClick={() => onSelect(index)}
              className={`w-full flex flex-col items-start gap-1 py-4 px-4 pr-10 rounded-xl transition-all ${
                activeIndex === index
                  ? 'active bg-primary text-primary-content shadow-lg scale-[1.02]'
                  : 'hover:bg-base-200'
              }`}
            >
              <div className="font-bold text-sm text-left leading-snug break-words w-full">
                {trip.title}
              </div>
              <div
                className={`text-[10px] opacity-60 font-mono ${
                  activeIndex === index ? 'text-primary-content/70' : ''
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
              className="btn btn-ghost btn-xs btn-circle absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-error hover:bg-error/10"
              title="Delete trip"
            >
              <IoTrashOutline className="w-3.5 h-3.5" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};
