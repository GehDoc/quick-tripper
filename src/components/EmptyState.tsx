import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="alert shadow-xl bg-base-100 border border-dashed text-center flex flex-col p-8 gap-1">
      <h3 className="font-bold text-lg">No active itineraries loaded</h3>
      <p className="text-xs text-base-content/60">
        Generate a route using your client API key or drop an imported file to populate the board.
      </p>
    </div>
  );
};
