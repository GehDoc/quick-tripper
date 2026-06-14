import React from 'react';
import { FaKey as Key } from 'react-icons/fa';
import { SiGithub as GitHub } from 'react-icons/si';
import { VERSION, REPO_URL } from '@/utils/version';
import { Logo } from '@/components/Logo';

interface NavbarProps {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ apiKey, onApiKeyChange }) => {
  return (
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
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="w-full max-w-xs"
          />
        </label>
      </div>
    </div>
  );
};
