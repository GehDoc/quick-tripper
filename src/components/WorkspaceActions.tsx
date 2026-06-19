import React from 'react';
import { FiDownload as Download, FiUpload as Upload, FiShare2 as Share2 } from 'react-icons/fi';
import { IoDesktopOutline } from 'react-icons/io5';

interface WorkspaceActionsProps {
  totalTrips: number;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onShare: () => void;
}

export const WorkspaceActions: React.FC<WorkspaceActionsProps> = React.memo(
  ({ totalTrips, onExport, onImport, onShare }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h2 className="text-xs tracking-widest font-black uppercase text-base-content/60 mb-3 px-1 flex items-center gap-2">
            <IoDesktopOutline className="w-4 h-4 text-primary" /> Local Workspace
          </h2>
          <div className="flex gap-2">
            <button
              disabled={totalTrips === 0}
              onClick={onExport}
              className="btn btn-outline flex-1"
              title="Export trips as JSON"
            >
              <Download className="w-5 h-5" /> Export
            </button>
            <label className="btn btn-outline flex-1" title="Import trips from JSON">
              <Upload className="w-5 h-5" /> Import
              <input type="file" accept=".json" className="hidden" onChange={onImport} />
            </label>
          </div>
        </div>
        <button
          disabled={totalTrips === 0}
          onClick={onShare}
          className="btn btn-primary w-full shadow-lg"
        >
          <Share2 className="w-5 h-5" /> Share Active Trip
        </button>
      </div>
    );
  },
);

WorkspaceActions.displayName = 'WorkspaceActions';
