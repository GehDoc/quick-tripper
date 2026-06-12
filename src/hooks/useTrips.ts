import { useState, useEffect } from 'react';
import { parseShareUrl } from '@/utils/share';

export interface Trip {
  id: string;
  destination: string;
  content: string;
  createdAt: string;
}

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>(() => {
    if (typeof window === 'undefined') return [];

    // 1. Load from LocalStorage
    const saved = localStorage.getItem('saved_trips');
    const initialTrips: Trip[] = saved ? JSON.parse(saved) : [];

    // 2. Check for shared URL payloads
    const sharedTrips = parseShareUrl();
    if (!sharedTrips) return initialTrips;

    // Merge shared trips with existing ones
    const merged = [...sharedTrips, ...initialTrips];
    localStorage.setItem('saved_trips', JSON.stringify(merged));
    return merged;
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Initialize: Clean URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('payload')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const addTrips = (newTrips: Trip[]) => {
    setTrips((prev) => {
      const merged = [...newTrips, ...prev];
      localStorage.setItem('saved_trips', JSON.stringify(merged));
      return merged;
    });
    setActiveIndex(0);
  };

  const deleteTrip = (id: string) => {
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    localStorage.setItem('saved_trips', JSON.stringify(updated));
    // Reset index to 0 to avoid out of bounds if the last item was deleted
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
  };
}
