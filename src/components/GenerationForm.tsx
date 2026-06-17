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
    <div className="bg-base-100 shadow-sm border-b border-base-200 p-4 sticky top-0 z-20">
      <div className="flex flex-col lg:flex-row items-end gap-4">
        <div className="flex-grow w-full min-w-0">
          <label className="label py-0 mb-1.5">
            <span className="label-text text-xs font-black uppercase tracking-widest text-base-content/60 flex items-center gap-2">
              <IoChatboxEllipsesOutline className="text-primary w-4 h-4" /> Plan your journey
            </span>
          </label>
          <textarea
            placeholder="Ex: From Paris to Mont Saint-Michel..."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            disabled={isLoading}
            className="textarea textarea-bordered w-full min-h-[70px] max-h-[70px] focus:outline-none text-base resize-none leading-relaxed"
          />
        </div>
        <div className="flex flex-col items-end gap-2 w-full lg:w-auto flex-none self-end">
          {error && <p className="text-error text-xs font-bold truncate max-w-xs">{error}</p>}
          <button
            onClick={onGenerate}
            disabled={isLoading || !prompt.trim()}
            className="btn btn-primary px-10 shadow-md whitespace-nowrap"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" /> Plan Trip
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
