'use client';

import React, { useState } from 'react';

// Standardized Hook, Service, and Share Utilities
import { useTrips } from '@/hooks/useTrips';
import { generateItinerary } from '@/services/ai';
import { generateShareUrl } from '@/utils/share';
import { EmptyState } from '@/components/EmptyState';
import { Navbar } from '@/components/Navbar';
import { GenerationForm } from '@/components/GenerationForm';
import { WorkspaceActions } from '@/components/WorkspaceActions';
import { TripNavigator } from '@/components/TripNavigator';
import { TripViewer } from '@/components/TripViewer';

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
  } = useTrips();

  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [apiKey, setApiKey] = useState<string>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('hf_api_key') || '' : '',
  );

  const handleApiKeyChange = (key: string) => {
    const trimmedKey = key.trim();
    setApiKey(trimmedKey);
    localStorage.setItem('hf_api_key', trimmedKey);
  };

  const handleGeneration = async () => {
    if (!apiKey) return setError('API Key required.');
    if (!prompt) return setError('Destination description required.');

    setIsLoading(true);
    setError('');

    try {
      const generatedMarkdown = await generateItinerary({ apiKey, prompt });

      addTrips([
        {
          id: Date.now().toString(),
          destination: prompt,
          content: generatedMarkdown,
          createdAt: new Date().toLocaleDateString(),
        },
      ]);

      setPrompt('');
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred during generation.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlShare = () => {
    if (!activeTrip) return;
    const shareUrl = generateShareUrl(activeTrip);
    navigator.clipboard.writeText(shareUrl);
    alert('Compressed share link copied to clipboard!');
  };

  const handleJsonExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trips));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `road-trips-${Date.now()}.json`);
    downloadAnchor.click();
  };

  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Navbar apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GenerationForm
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGeneration}
            isLoading={isLoading}
            error={error}
          />
          <WorkspaceActions
            totalTrips={totalTrips}
            onExport={handleJsonExport}
            onImport={handleJsonImport}
            onShare={handleUrlShare}
          />
        </div>
        {activeTrip ? (
          <div className="space-y-4">
            <TripNavigator
              activeTrip={activeTrip}
              activeIndex={activeIndex}
              totalTrips={totalTrips}
              onNext={() => setActiveIndex(activeIndex + 1)}
              onPrev={() => setActiveIndex(activeIndex - 1)}
            />
            <TripViewer trip={activeTrip} onDelete={deleteTrip} />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
