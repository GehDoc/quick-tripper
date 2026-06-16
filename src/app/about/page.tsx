import React from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-8">
      <Link href="/" className="btn btn-ghost mb-10 gap-2">
        <IoArrowBack className="w-5 h-5" /> Back to Planner
      </Link>

      <article className="prose prose-slate lg:prose-lg max-w-none">
        <h1 className="text-5xl font-extrabold mb-8 tracking-tight">About Quick-tripper</h1>

        <p className="lead text-xl opacity-80 leading-relaxed">
          A privacy-first, zero-backend &quot;Point-to-Point&quot; trip planner designed for the
          modern traveler.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">
          The &quot;Free &amp; Private&quot; Philosophy
        </h2>
        <p className="text-lg">
          Quick-tripper was born from a simple idea: travel planning should be powerful, private,
          and free. We believe that your travel data belongs to you, not to a database or a
          corporation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <div className="card bg-base-100 shadow-md border border-base-200">
            <div className="card-body gap-3">
              <h3 className="card-title text-primary text-base font-black uppercase tracking-widest">
                Free to Use
              </h3>
              <p className="text-sm opacity-70 leading-relaxed">
                MIT Licensed and powered by free-tier AI inference from Hugging Face.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md border border-base-200">
            <div className="card-body gap-3">
              <h3 className="card-title text-primary text-base font-black uppercase tracking-widest">
                Privacy-First
              </h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Zero tracking, no cookies, and no backend. All data stays in your browser.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md border border-base-200">
            <div className="card-body gap-3">
              <h3 className="card-title text-primary text-base font-black uppercase tracking-widest">
                BYOK
              </h3>
              <p className="text-sm opacity-70 leading-relaxed">
                &quot;Bring Your Own Key&quot; gives you full control over your AI identity.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6">How it Works</h2>
        <p className="text-lg">
          Unlike traditional planners that generate generic itineraries, Quick-tripper focuses on{' '}
          <strong>Point-to-Point</strong> journeys. You tell us where you start and where
          you&apos;re going, along with your notes. Our AI extracts the locations and formats your
          insights, while Google Maps provides the most efficient route proposals.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Open Source</h2>
        <p className="text-lg">
          This project is entirely open source. You can audit the code, contribute to its
          development, or even host your own version.
        </p>
        <div className="mt-8">
          <a
            href="https://github.com/gehdoc/quick-tripper"
            target="_blank"
            className="btn btn-outline btn-primary px-12"
          >
            View on GitHub
          </a>
        </div>
      </article>
    </div>
  );
}
