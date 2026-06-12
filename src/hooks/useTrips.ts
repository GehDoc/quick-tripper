import { useState, useEffect } from 'react';
import { parseShareUrl } from '@/utils/share';

export interface Trip {
  id: string;
  destination: string;
  content: string;
  createdAt: string;
}

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Initialize data: Hydrate from LocalStorage and parse shared URL payloads
  useEffect(() => {
    // 1. Load from LocalStorage
    const savedTrips = localStorage.getItem('saved_trips');
    let initialTrips: Trip[] = [];
    if (savedTrips) {
      try {
        initialTrips = JSON.parse(savedTrips);
      } catch (e) {
        console.error("Failed to parse saved trips", e);
      }
    }

    // 2. Check for shared URL payloads (higher priority for view)
    const sharedTrips = parseShareUrl();
    if (sharedTrips) {
      // Merge shared trips with existing ones, avoiding duplicates if necessary
      // For simplicity, we add them to the top
      const merged = [...sharedTrips, ...initialTrips];
      setTrips(merged);
      localStorage.setItem('saved_trips', JSON.stringify(merged));
      
      // Clean URL params without reload
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      setTrips(initialTrips);
    }
  }, []);

  const addTrips = (newTrips: Trip[]) => {
    setTrips(prev => {
      const merged = [...newTrips, ...prev];
      localStorage.setItem('saved_trips', JSON.stringify(merged));
      return merged;
    });
    setActiveIndex(0);
  };

  const deleteTrip = (id: string) => {
    const updated = trips.filter(t => t.id !== id);
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
    totalTrips: trips.length
  };
}