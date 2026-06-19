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
import { TripNavigator } from '@/components/TripNavigator'; // Import TripNavigator
import { trackEvent, ANALYTICS_EVENTS } from '@/utils/analytics';
import { Footer } from '@/components/Footer';

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
    if (!apiKey) {
      setError('API Key required.');
      trackEvent(ANALYTICS_EVENTS.TRIP_GENERATION_FAILED, { reason: 'api_key_missing' });
      return;
    }
    if (!prompt.trim()) {
      setError('Trip description required.');
      trackEvent(ANALYTICS_EVENTS.TRIP_GENERATION_FAILED, { reason: 'prompt_missing' });
      return;
    }

    setIsLoading(true);
    setError('');
    trackEvent(ANALYTICS_EVENTS.TRIP_GENERATION_STARTED);

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
      trackEvent(ANALYTICS_EVENTS.TRIP_GENERATION_SUCCESS, { title: tripDetails.title });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred during generation.';
      setError(errorMessage);
      trackEvent(ANALYTICS_EVENTS.TRIP_GENERATION_FAILED, { error_message: errorMessage });
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

  // Navigator Handlers
  const handleNextTrip = useCallback(() => {
    setActiveIndex(Math.min(activeIndex + 1, totalTrips - 1));
  }, [activeIndex, setActiveIndex, totalTrips]);

  const handlePrevTrip = useCallback(() => {
    setActiveIndex(Math.max(activeIndex - 1, 0));
  }, [activeIndex, setActiveIndex]);

  if (!isLoaded) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="app-workspace flex-col lg:flex-row overflow-hidden">
      {/* Sidebar: Locked in the rigid frame */}
      <aside className="app-sidebar w-full lg:w-80 flex-none">
        <div className="p-6 border-b border-base-200">
          <WorkspaceActions
            totalTrips={totalTrips}
            onExport={handleJsonExport}
            onImport={handleJsonImport}
            onShare={handleUrlShare}
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          {/* Trip History List for large screens */}
          <div className="hidden lg:block">
            <TripHistory
              trips={trips}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onDelete={handleDeleteTrip}
            />
          </div>
          {/* Trip Navigator for small screens (replaces history list) */}
          <div className="lg:hidden">
            {activeTrip && totalTrips > 0 && (
              <TripNavigator
                activeTrip={activeTrip}
                activeIndex={activeIndex}
                totalTrips={totalTrips}
                onNext={handleNextTrip}
                onPrev={handlePrevTrip}
              />
            )}
          </div>
        </div>
      </aside>

      {/* Main Area: Fixed height dashboard */}
      <div className="flex-grow flex flex-col min-h-0 min-w-0 bg-base-200/30">
        <GenerationForm
          prompt={prompt}
          onPromptChange={setPrompt}
          onGenerate={handleGeneration}
          isLoading={isLoading}
          error={error}
        />

        <main className="flex-grow flex flex-col min-h-0 overflow-y-auto 2xl:overflow-hidden">
          {activeTrip ? (
            <TripViewer trip={activeTrip} onDelete={handleDeleteTrip} />
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center space-y-8 py-10">
              <EmptyState />
              <Footer />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
