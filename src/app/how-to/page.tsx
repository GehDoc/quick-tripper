import React from 'react';
import Link from 'next/link';
import { IoArrowBack, IoMap, IoFlash, IoShieldCheckmark } from 'react-icons/io5';

export default function HowTo() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <Link href="/" className="btn btn-ghost btn-sm mb-8 gap-2">
        <IoArrowBack /> Back to Planner
      </Link>

      <article className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold mb-6">How to Use Quick-tripper</h1>

        <p className="lead text-lg opacity-80">
          Master the art of minimalist, private trip planning in three easy steps.
        </p>

        <div className="space-y-12 mt-10">
          <section className="flex gap-6">
            <div className="flex-none">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <IoShieldCheckmark className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mt-0">Step 1: Set Up Your Key</h2>
              <p>
                Get a free &quot;User Access Token&quot; from your{' '}
                <a href="https://huggingface.co/settings/tokens" target="_blank">
                  Hugging Face Settings
                </a>
                . Paste it into the top bar. This key is stored ONLY in your browser&apos;s local
                storage.
              </p>
            </div>
          </section>

          <section className="flex gap-6">
            <div className="flex-none">
              <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                <IoFlash className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mt-0">Step 2: Describe Your Journey</h2>
              <p>Be as specific or as vague as you like. For example:</p>
              <ul className="bg-base-100 p-4 rounded-lg border border-base-200 list-none italic">
                <li>&quot;From Tokyo to Kyoto, want to see Fushimi Inari and eat ramen.&quot;</li>
                <li>&quot;Interlaken to Lauterbrunnen, looking for a scenic hike.&quot;</li>
              </ul>
            </div>
          </section>

          <section className="flex gap-6">
            <div className="flex-none">
              <div className="bg-accent/10 p-3 rounded-xl text-accent">
                <IoMap className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mt-0">Step 3: Navigate and Explore</h2>
              <p>
                Click &quot;Plan Trip&quot;. The AI will generate a direct Google Maps link with
                route proposals. Your personal notes will be formatted below the map for quick
                reference.
              </p>
            </div>
          </section>
        </div>

        <h2 className="text-2xl font-semibold mt-16">Sample Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-base-300/30 p-4 rounded-lg text-sm">
            <strong>The Classic Explorer:</strong>
            <br />
            &quot;Paris to Mont Saint-Michel. I want to visit the abbey and walk the bay at low
            tide.&quot;
          </div>
          <div className="bg-base-300/30 p-4 rounded-lg text-sm">
            <strong>The Road Tripper:</strong>
            <br />
            &quot;SF to LA via Highway 1. Stopping at Big Sur and Santa Barbara for photos.&quot;
          </div>
        </div>
      </article>
    </div>
  );
}
