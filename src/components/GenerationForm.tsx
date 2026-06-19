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
      <div className="flex flex-col gap-2">
        <label className="label py-0 px-1">
          <span className="label-text text-xs font-black uppercase tracking-widest text-base-content/60 flex items-center gap-2">
            <IoChatboxEllipsesOutline className="text-primary w-4 h-4" /> Plan your journey
          </span>
          {error && <p className="text-error text-xs font-bold animate-pulse">{error}</p>}
        </label>

        <div className="relative group">
          <textarea
            placeholder="Ex: From Paris to Mont Saint-Michel..."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            disabled={isLoading}
            className="textarea textarea-bordered w-full min-h-[85px] max-h-[120px] focus:outline-none text-base resize-none leading-relaxed pr-44 pt-4 pb-4 transition-all focus:border-primary/50 shadow-inner"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={onGenerate}
              disabled={isLoading || !prompt.trim()}
              className="btn btn-primary px-8 shadow-xl transition-transform active:scale-95"
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
    </div>
  );
};
