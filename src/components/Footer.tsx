import React from 'react';
import Link from 'next/link';
import { IoHeart } from 'react-icons/io5';

export const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-20 border-t border-base-300">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/about" className="link link-hover">
          About
        </Link>
        <Link href="/how-to" className="link link-hover">
          How-to
        </Link>
        <a
          href="https://github.com/gehdoc/quick-tripper"
          target="_blank"
          className="link link-hover"
        >
          GitHub
        </a>
        <a href="https://paypal.me/GehDoc" target="_blank" className="link link-hover">
          Support
        </a>
      </nav>
      <aside>
        <p className="flex items-center gap-2 text-base opacity-70">
          Made with <IoHeart className="text-error" /> for privacy-conscious travelers.
        </p>
        <p className="text-sm opacity-50 mt-2">
          © {new Date().getFullYear()} Quick-tripper — MIT License
        </p>
        <div className="flex gap-6 mt-6 opacity-40 text-xs font-medium uppercase tracking-widest">
          <span>Zero Cookies</span>
          <span>Zero Tracking</span>
          <span>Zero Backend</span>
        </div>
      </aside>
    </footer>
  );
};
