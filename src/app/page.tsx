'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { FaKey as Key } from 'react-icons/fa';
import { IoSend as Send } from 'react-icons/io5';
import {
  FiDownload as Download,
  FiUpload as Upload,
  FiShare2 as Share2,
  FiTrash2 as Trash2,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
} from 'react-icons/fi';
import { SiGithub as GitHub } from 'react-icons/si';

// Standardized Hook, Service, and Share Utilities
import { useTrips } from '@/hooks/useTrips';
import { generateItinerary } from '@/services/ai';
import { generateShareUrl } from '@/utils/share';
import { VERSION, REPO_URL } from '@/utils/version';
import { Logo } from '@/components/Logo';
import { EmptyState } from '@/components/EmptyState';

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
        <div className="navbar bg-base-100 shadow-xl rounded-box justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <Logo className="text-primary w-10 h-10" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight">Quick-tripper</span>
              <div className="flex items-center gap-3 text-[10px] text-base-content/50">
                <span>v{VERSION}</span>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <GitHub className="w-3 h-3" /> GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2 input-sm">
              <Key className="w-4 h-4 opacity-60" />
              <input
                type="password"
                placeholder="HuggingFace API Token"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                className="w-full max-w-xs"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl md:col-span-2">
            <div className="card-body gap-3">
              <h2 className="card-title text-sm font-semibold text-base-content/70">
                Describe your next journey
              </h2>
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Ex: A 4-day hike itinerary across Swiss Alps starting from Interlaken..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                  className="input input-bordered join-item w-full input-md focus:outline-none"
                />
                <button
                  onClick={handleGeneration}
                  disabled={isLoading}
                  className="btn btn-primary join-item px-6"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && <p className="text-error text-xs font-medium">{error}</p>}
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body justify-between gap-2 p-4">
              <h2 className="card-title text-xs tracking-wide uppercase opacity-50">
                Serverless Workspace
              </h2>
              <div className="flex gap-2">
                <button
                  disabled={totalTrips === 0}
                  onClick={handleJsonExport}
                  className="btn btn-outline btn-xs flex-1 norm-case"
                >
                  <Download className="w-3 h-3" /> Export
                </button>
                <label className="btn btn-outline btn-xs flex-1 norm-case">
                  <Upload className="w-3 h-3" /> Import
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleJsonImport}
                  />
                </label>
              </div>
              <button
                disabled={totalTrips === 0}
                onClick={handleUrlShare}
                className="btn btn-accent btn-sm w-full mt-2 normal-case text-white"
              >
                <Share2 className="w-4 h-4" /> Share Active Link
              </button>
            </div>
          </div>
        </div>
        {activeTrip ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-base-100 p-2 rounded-box shadow-md border border-base-300">
              <button
                disabled={activeIndex === totalTrips - 1}
                onClick={() => setActiveIndex(activeIndex + 1)}
                className="btn btn-ghost btn-circle"
              >
                <ChevronLeft />
              </button>
              <div className="text-center max-w-xs md:max-w-md truncate">
                <div className="font-bold text-sm truncate">{activeTrip.destination}</div>
                <div className="text-xs opacity-50 font-mono">
                  {activeIndex + 1} / {totalTrips} — {activeTrip.createdAt}
                </div>
              </div>
              <button
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex(activeIndex - 1)}
                className="btn btn-ghost btn-circle"
              >
                <ChevronRight />
              </button>
            </div>

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
