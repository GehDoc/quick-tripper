import React from 'react';
import { IoSend as Send } from 'react-icons/io5';

interface GenerationFormProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  error?: string;
}

export const GenerationForm: React.FC<GenerationFormProps> = ({
  prompt,
  onPromptChange,
  onGenerate,
  isLoading,
  error,
}) => {
  return (
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
            onChange={(e) => onPromptChange(e.target.value)}
            disabled={isLoading}
            className="input input-bordered join-item w-full input-md focus:outline-none"
          />
          <button
            onClick={onGenerate}
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
  );
};
