'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { useApp } from '@/hooks/useApp';

/**
 * A wrapper component to bridge the global AppContext with the Navbar.
 * This ensures the Navbar can access the API key and state from anywhere in the app.
 */
export const NavbarWrapper: React.FC = () => {
  const { apiKey, setApiKey } = useApp();

  return <Navbar apiKey={apiKey} onApiKeyChange={setApiKey} />;
};
