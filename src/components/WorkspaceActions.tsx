import React from 'react';
import { FiDownload as Download, FiUpload as Upload, FiShare2 as Share2 } from 'react-icons/fi';

interface WorkspaceActionsProps {
  totalTrips: number;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onShare: () => void;
}

export const WorkspaceActions: React.FC<WorkspaceActionsProps> = React.memo(
  ({ totalTrips, onExport, onImport, onShare }) => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <h2 className="text-[10px] tracking-[0.2em] font-black uppercase opacity-40 mb-2">
            Local Workspace
          </h2>
          <div className="flex gap-2">
            <button
              disabled={totalTrips === 0}
              onClick={onExport}
              className="btn btn-outline btn-xs flex-1 text-[10px]"
              title="Export trips as JSON"
            >
              <Download className="w-3 h-3" /> Export
            </button>
            <label
              className="btn btn-outline btn-xs flex-1 text-[10px]"
              title="Import trips from JSON"
            >
              <Upload className="w-3 h-3" /> Import
              <input type="file" accept=".json" className="hidden" onChange={onImport} />
            </label>
          </div>
        </div>
        <button
          disabled={totalTrips === 0}
          onClick={onShare}
          className="btn btn-primary btn-sm w-full shadow-md text-xs"
        >
          <Share2 className="w-4 h-4" /> Share Active Trip
        </button>
      </div>
    );
  },
);

WorkspaceActions.displayName = 'WorkspaceActions';
