import React from 'react';
import { IoSend as Send, IoChatboxEllipsesOutline } from 'react-icons/io5';

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
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body gap-4 p-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <IoChatboxEllipsesOutline className="text-primary" /> Describe your journey
        </h2>

        <div className="form-control">
          <textarea
            placeholder="Ex: From Paris to Mont Saint-Michel. I want to visit the abbey and walk the bay at low tide."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            disabled={isLoading}
            className="textarea textarea-bordered w-full min-h-[120px] focus:outline-none resize-y text-base"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-2">
          {error && (
            <p className="text-error text-xs font-medium bg-error/10 px-3 py-2 rounded-lg flex-grow">
              {error}
            </p>
          )}
          <button
            onClick={onGenerate}
            disabled={isLoading || !prompt.trim()}
            className="btn btn-primary w-full md:w-auto px-10 shadow-lg ml-auto"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" /> Plan Trip
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
