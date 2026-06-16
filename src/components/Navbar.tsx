import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaKey as Key } from 'react-icons/fa';
import { SiGithub as GitHub } from 'react-icons/si';
import { IoInformationCircleOutline, IoBookOutline, IoMapOutline } from 'react-icons/io5';
import { VERSION, REPO_URL } from '@/utils/version';
import { Logo } from '@/components/Logo';

interface NavbarProps {
  apiKey?: string;
  onApiKeyChange?: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({ apiKey, onApiKeyChange }) => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Planner', icon: <IoMapOutline className="w-4 h-4" /> },
    { href: '/about', label: 'About', icon: <IoInformationCircleOutline className="w-4 h-4" /> },
    { href: '/how-to', label: 'How-to', icon: <IoBookOutline className="w-4 h-4" /> },
  ];

  return (
    <div className="navbar bg-transparent justify-between gap-4 p-2 px-6 min-h-[64px]">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo className="text-primary w-8 h-8" />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-lg tracking-tight leading-none">Quick-tripper</span>
            <span className="text-[10px] text-base-content/40">v{VERSION}</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn btn-sm btn-ghost gap-2 ${pathname === link.href ? 'btn-active bg-base-200' : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onApiKeyChange && (
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2 input-sm">
              <Key className="w-3 h-3 opacity-60" />
              <input
                type="password"
                placeholder="HF Token"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                className="w-32 sm:w-40 lg:w-48"
              />
            </label>
          </div>
        )}

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-ghost btn-circle"
          title="GitHub Repository"
        >
          <GitHub className="w-4 h-4" />
        </a>

        {/* Mobile Nav Toggle */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={pathname === link.href ? 'active' : ''}>
                  {link.icon} {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';
