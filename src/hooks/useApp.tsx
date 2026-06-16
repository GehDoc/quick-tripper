'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Trip } from '@/types/trip';
import { useTrips } from '@/hooks/useTrips';

interface AppContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  trips: Trip[];
  activeTrip: Trip | null;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addTrips: (trips: Trip[]) => void;
  deleteTrip: (id: string) => void;
  totalTrips: number;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tripHelpers = useTrips();
  const [apiKey, setInternalApiKey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hf_api_key') || '';
    }
    return '';
  });

  const setApiKey = useCallback((key: string) => {
    const trimmedKey = key.trim();
    setInternalApiKey(trimmedKey);
    localStorage.setItem('hf_api_key', trimmedKey);
  }, []);

  return (
    <AppContext.Provider value={{ ...tripHelpers, apiKey, setApiKey }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
