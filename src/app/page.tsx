'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { FiTrash2 as Trash2 } from 'react-icons/fi';

// Standardized Hook, Service, and Share Utilities
import { useTrips } from '@/hooks/useTrips';
import { generateItinerary } from '@/services/ai';
import { generateShareUrl } from '@/utils/share';
import { Logo } from '@/components/Logo';
import { EmptyState } from '@/components/EmptyState';
import { Navbar } from '@/components/Navbar';
import { GenerationForm } from '@/components/GenerationForm';
import { WorkspaceActions } from '@/components/WorkspaceActions';
import { TripNavigator } from '@/components/TripNavigator';

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

            <div className="card bg-base-100 shadow-2xl relative border border-base-300">
              <div className="card-body p-6 md:p-12">
                <button
                  onClick={() => deleteTrip(activeTrip.id)}
                  className="btn btn-ghost btn-sm btn-circle absolute top-4 right-4 text-error/40 hover:text-error transition-colors"
                  title="Remove data entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <article className="prose max-w-none text-base-content leading-relaxed">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary btn-sm gap-2 my-4 no-underline inline-flex shadow-sm hover:scale-[1.02] transition-transform"
                        >
                          <Logo className="w-3 h-3" /> {children}
                        </a>
                      ),
                      iframe: ({ src, ...props }) => {
                        const isGoogleMap =
                          src?.startsWith('https://www.google.com/maps/embed') ||
                          src?.startsWith('https://www.google.com/maps?') ||
                          src?.startsWith('https://maps.google.com/');

                        if (!isGoogleMap) {
                          return (
                            <div className="p-4 bg-error/10 text-error text-xs rounded-box">
                              Blocked unsafe iframe: {src}
                            </div>
                          );
                        }

                        return (
                          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg my-6 border border-base-300">
                            <iframe
                              src={src}
                              className="w-full h-full border-0"
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              {...props}
                            />
                          </div>
                        );
                      },
                    }}
                  >
                    {activeTrip.content}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
