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
      <h3 className="px-4 text-xs font-bold uppercase tracking-widest text-base-content/40 flex items-center gap-2">
        <IoTimeOutline /> Trip History
      </h3>
      <div className="menu menu-md w-full p-0">
        {trips.map((trip, index) => (
          <li key={trip.id} className="group flex-row items-center">
            <button
              onClick={() => onSelect(index)}
              className={`flex-grow flex flex-col items-start gap-0 py-3 rounded-lg ${
                activeIndex === index
                  ? 'active bg-primary text-primary-content'
                  : 'hover:bg-base-300'
              }`}
            >
              <div className="font-bold text-sm truncate w-full text-left">{trip.title}</div>
              <div
                className={`text-[10px] opacity-60 font-mono ${activeIndex === index ? 'text-primary-content/70' : ''}`}
              >
                {trip.createdAt}
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(trip.id);
              }}
              className="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-opacity text-error"
              title="Delete trip"
            >
              <IoTrashOutline className="w-4 h-4" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};
