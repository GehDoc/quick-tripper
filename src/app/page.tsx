'use client';

import React, { useState, useCallback } from 'react';

// Standardized Hook, Service, and Share Utilities
import { useApp } from '@/hooks/useApp';
import { generateItinerary } from '@/services/ai';
import { generateShareUrl } from '@/utils/share';
import { EmptyState } from '@/components/EmptyState';
import { GenerationForm } from '@/components/GenerationForm';
import { WorkspaceActions } from '@/components/WorkspaceActions';
import { TripViewer } from '@/components/TripViewer';
import { TripHistory } from '@/components/TripHistory';
import { trackEvent, ANALYTICS_EVENTS } from '@/utils/analytics';

export default function Home() {
  const {
    trips,
    activeTrip,
    activeIndex,
    setActiveIndex,
    addTrips,
    deleteTrip,
    totalTrips,
    isLoaded,
    apiKey,
  } = useApp();

  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGeneration = useCallback(async () => {
    if (!apiKey) return setError('API Key required.');
    if (!prompt) return setError('Trip description required.');

    setIsLoading(true);
    setError('');

    try {
      const tripDetails = await generateItinerary({ apiKey, prompt });

      addTrips([
        {
          id: Date.now().toString(),
          prompt: prompt,
          title: tripDetails.title,
          start: tripDetails.start,
          stop: tripDetails.stop,
          content: tripDetails.content,
          createdAt: new Date().toLocaleDateString(),
        },
      ]);

      setPrompt('');
      trackEvent(ANALYTICS_EVENTS.TRIP_PLANNED, { title: tripDetails.title });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred during generation.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, prompt, addTrips]);

  const handleUrlShare = useCallback(() => {
    if (!activeTrip) return;
    const shareUrl = generateShareUrl(activeTrip);
    navigator.clipboard.writeText(shareUrl);
    alert('Compressed share link copied to clipboard!');
    trackEvent(ANALYTICS_EVENTS.TRIP_SHARED, { trip_id: activeTrip.id });
  }, [activeTrip]);

  const handleJsonExport = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trips));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `road-trips-${Date.now()}.json`);
    downloadAnchor.click();
    trackEvent(ANALYTICS_EVENTS.TRIP_EXPORTED, { count: trips.length });
  }, [trips]);

  const handleJsonImport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileReader = new FileReader();
      if (e.target.files?.[0]) {
        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target?.result as string);
            if (Array.isArray(parsed)) addTrips(parsed);
          } catch {
            alert('Invalid JSON schema.');
          }
        };
      }
    },
    [addTrips],
  );

  const handleDeleteTrip = useCallback(
    (id: string) => {
      deleteTrip(id);
      trackEvent(ANALYTICS_EVENTS.TRIP_DELETED, { trip_id: id });
    },
    [deleteTrip],
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar: Full height on desktop */}
      <aside className="w-full lg:w-80 bg-base-100 border-r border-base-300 flex flex-col shadow-inner z-10 overflow-y-auto lg:overflow-visible">
        <div className="p-4 border-b border-base-200">
          <WorkspaceActions
            totalTrips={totalTrips}
            onExport={handleJsonExport}
            onImport={handleJsonImport}
            onShare={handleUrlShare}
          />
        </div>
        <div className="flex-grow lg:overflow-y-auto">
          <TripHistory
            trips={trips}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            onDelete={handleDeleteTrip}
          />
        </div>
      </aside>

      {/* Main Content Area: Scrollable */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto bg-base-200/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <GenerationForm
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGeneration}
            isLoading={isLoading}
            error={error}
          />

          {activeTrip ? (
            <TripViewer trip={activeTrip} onDelete={handleDeleteTrip} />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}
