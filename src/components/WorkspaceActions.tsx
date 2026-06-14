import React from 'react';
import { FiDownload as Download, FiUpload as Upload, FiShare2 as Share2 } from 'react-icons/fi';

interface WorkspaceActionsProps {
  totalTrips: number;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onShare: () => void;
}

export const WorkspaceActions: React.FC<WorkspaceActionsProps> = ({
  totalTrips,
  onExport,
  onImport,
  onShare,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body justify-between gap-2 p-4">
        <h2 className="card-title text-xs tracking-wide uppercase opacity-50">
          Serverless Workspace
        </h2>
        <div className="flex gap-2">
          <button
            disabled={totalTrips === 0}
            onClick={onExport}
            className="btn btn-outline btn-xs flex-1 norm-case"
          >
            <Download className="w-3 h-3" /> Export
          </button>
          <label className="btn btn-outline btn-xs flex-1 norm-case">
            <Upload className="w-3 h-3" /> Import
            <input type="file" accept=".json" className="hidden" onChange={onImport} />
          </label>
        </div>
        <button
          disabled={totalTrips === 0}
          onClick={onShare}
          className="btn btn-accent btn-sm w-full mt-2 normal-case text-white"
        >
          <Share2 className="w-4 h-4" /> Share Active Link
        </button>
      </div>
    </div>
  );
};
