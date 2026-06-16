import React from 'react';
import Link from 'next/link';
import { IoArrowBack, IoMap, IoFlash, IoShieldCheckmark } from 'react-icons/io5';

export default function HowTo() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-8">
      <Link href="/" className="btn btn-ghost mb-10 gap-2">
        <IoArrowBack className="w-5 h-5" /> Back to Planner
      </Link>

      <article className="prose prose-slate lg:prose-lg max-w-none">
        <h1 className="text-5xl font-extrabold mb-8 tracking-tight">How to Use Quick-tripper</h1>

        <p className="lead text-xl opacity-80 leading-relaxed">
          Master the art of minimalist, private trip planning in three easy steps.
        </p>

        <div className="space-y-16 mt-12">
          <section className="flex gap-8">
            <div className="flex-none">
              <div className="bg-primary/10 p-5 rounded-2xl text-primary">
                <IoShieldCheckmark className="w-10 h-10" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-0 mb-3">Step 1: Set Up Your Key</h2>
              <p className="text-lg leading-relaxed">
                Get a free &quot;User Access Token&quot; from your{' '}
                <a
                  href="https://huggingface.co/settings/tokens"
                  target="_blank"
                  className="font-bold underline decoration-primary decoration-2 underline-offset-4"
                >
                  Hugging Face Settings
                </a>
                . Paste it into the top bar. This key is stored ONLY in your browser&apos;s local
                storage.
              </p>
            </div>
          </section>

          <section className="flex gap-8">
            <div className="flex-none">
              <div className="bg-secondary/10 p-5 rounded-2xl text-secondary">
                <IoFlash className="w-10 h-10" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-0 mb-3">Step 2: Describe Your Journey</h2>
              <p className="text-lg leading-relaxed">
                Be as specific or as vague as you like. For example:
              </p>
              <ul className="bg-base-100 p-6 rounded-2xl border border-base-200 list-none italic space-y-2 mt-4">
                <li className="text-base">
                  &quot;From Tokyo to Kyoto, want to see Fushimi Inari and eat ramen.&quot;
                </li>
                <li className="text-base">
                  &quot;Interlaken to Lauterbrunnen, looking for a scenic hike.&quot;
                </li>
              </ul>
            </div>
          </section>

          <section className="flex gap-8">
            <div className="flex-none">
              <div className="bg-accent/10 p-5 rounded-2xl text-accent">
                <IoMap className="w-10 h-10" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-0 mb-3">Step 3: Navigate and Explore</h2>
              <p className="text-lg leading-relaxed">
                Click &quot;Plan Trip&quot;. The AI will generate a direct Google Maps link with
                route proposals. Your personal notes will be formatted below the map for quick
                reference.
              </p>
            </div>
          </section>
        </div>

        <h2 className="text-3xl font-bold mt-20 mb-8">Sample Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-base-300/30 p-6 rounded-2xl text-base leading-relaxed">
            <strong className="text-primary uppercase text-xs tracking-widest font-black block mb-2">
              The Classic Explorer:
            </strong>
            &quot;Paris to Mont Saint-Michel. I want to visit the abbey and walk the bay at low
            tide.&quot;
          </div>
          <div className="bg-base-300/30 p-6 rounded-2xl text-base leading-relaxed">
            <strong className="text-secondary uppercase text-xs tracking-widest font-black block mb-2">
              The Road Tripper:
            </strong>
            &quot;SF to LA via Highway 1. Stopping at Big Sur and Santa Barbara for photos.&quot;
          </div>
        </div>
      </article>
    </div>
  );
}
