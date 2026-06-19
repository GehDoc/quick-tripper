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
    { href: '/', label: 'Planner', icon: <IoMapOutline className="w-5 h-5" /> },
    { href: '/about', label: 'About', icon: <IoInformationCircleOutline className="w-5 h-5" /> },
    { href: '/how-to', label: 'How-to', icon: <IoBookOutline className="w-5 h-5" /> },
  ];

  return (
    <div className="navbar bg-transparent justify-between gap-6 p-4 px-8 min-h-[80px]">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <Logo className="text-primary w-10 h-10" />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none">Quick-tripper</span>
            <span className="text-xs text-base-content/40 mt-1">v{VERSION}</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2 ml-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn btn-ghost gap-2 px-4 ${pathname === link.href ? 'btn-active bg-base-200' : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {onApiKeyChange && (
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-3">
              <Key className="w-4 h-4 opacity-60" />
              <input
                type="password"
                placeholder="HF Token"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                className="w-40 sm:w-52 lg:w-64"
              />
            </label>
          </div>
        )}

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost btn-circle"
          title="GitHub Repository"
        >
          <GitHub className="w-6 h-6" />
        </a>

        {/* Mobile Nav Toggle */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
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
