import React from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <Link href="/" className="btn btn-ghost btn-sm mb-8 gap-2">
        <IoArrowBack /> Back to Planner
      </Link>

      <article className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold mb-6">About Quick-tripper</h1>

        <p className="lead text-lg opacity-80">
          A privacy-first, zero-backend &quot;Point-to-Point&quot; trip planner designed for the
          modern traveler.
        </p>

        <h2 className="text-2xl font-semibold mt-10">
          The &quot;Free &amp; Private&quot; Philosophy
        </h2>
        <p>
          Quick-tripper was born from a simple idea: travel planning should be powerful, private,
          and free. We believe that your travel data belongs to you, not to a database or a
          corporation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary text-sm">Free to Use</h3>
              <p className="text-xs opacity-70">
                MIT Licensed and powered by free-tier AI inference from Hugging Face.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary text-sm">Privacy-First</h3>
              <p className="text-xs opacity-70">
                Zero tracking, no cookies, and no backend. All data stays in your browser.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary text-sm">BYOK</h3>
              <p className="text-xs opacity-70">
                &quot;Bring Your Own Key&quot; gives you full control over your AI identity.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10">How it Works</h2>
        <p>
          Unlike traditional planners that generate generic itineraries, Quick-tripper focuses on{' '}
          <strong>Point-to-Point</strong> journeys. You tell us where you start and where
          you&apos;re going, along with your notes. Our AI extracts the locations and formats your
          insights, while Google Maps provides the most efficient route proposals.
        </p>

        <h2 className="text-2xl font-semibold mt-10">Open Source</h2>
        <p>
          This project is entirely open source. You can audit the code, contribute to its
          development, or even host your own version.
        </p>
        <div className="mt-4">
          <a
            href="https://github.com/gehdoc/quick-tripper"
            target="_blank"
            className="btn btn-outline btn-primary"
          >
            View on GitHub
          </a>
        </div>
      </article>
    </div>
  );
}
