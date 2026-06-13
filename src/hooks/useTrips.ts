import { useState, useEffect } from 'react';
import { parseShareUrl } from '@/utils/share';
import { migrateToLatest, CURRENT_VERSION } from '@/utils/migration';
import { Trip } from '@/types/trip';

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Load from LocalStorage
    const saved = localStorage.getItem('saved_trips');
    const rawData = saved ? JSON.parse(saved) : [];

    // Migrate data if necessary
    const versioned = migrateToLatest(rawData);

    // Perform upgrade to latest if it's currently v0
    let currentTrips = versioned.data;
    let needsSave = versioned.version !== CURRENT_VERSION;

    // 2. Check for shared URL payloads
    const sharedTrips = parseShareUrl();
    if (sharedTrips) {
      currentTrips = [...sharedTrips, ...currentTrips];
      needsSave = true;
    }

    if (needsSave) {
      localStorage.setItem(
        'saved_trips',
        JSON.stringify({ version: CURRENT_VERSION, data: currentTrips }),
      );
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrips(currentTrips);
    setIsLoaded(true);
  }, []);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const addTrips = (newTrips: Trip[]) => {
    setTrips((prev) => {
      const merged = [...newTrips, ...prev];
      localStorage.setItem(
        'saved_trips',
        JSON.stringify({ version: CURRENT_VERSION, data: merged }),
      );
      return merged;
    });
    setActiveIndex(0);
  };

  const deleteTrip = (id: string) => {
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    localStorage.setItem(
      'saved_trips',
      JSON.stringify({ version: CURRENT_VERSION, data: updated }),
    );
    setActiveIndex(0);
  };

  return {
    trips,
    activeTrip: trips[activeIndex] || null,
    activeIndex,
    setActiveIndex,
    addTrips,
    deleteTrip,
    totalTrips: trips.length,
    isLoaded,
  };
}
