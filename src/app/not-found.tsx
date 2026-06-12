import Link from 'next/link';
import { MapPin, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 card bg-base-100 shadow-2xl p-8 md:p-12 border border-base-300">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <MapPin className="w-24 h-24 text-primary opacity-20" />
            <span className="absolute inset-0 flex items-center justify-center text-4xl font-black text-primary">
              404
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Route Not Found</h1>
          <p className="text-base-content/60 leading-relaxed">
            It looks like this destination isn&apos;t on our map. The link might be broken or the
            itinerary was removed.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="btn btn-primary btn-wide gap-2 normal-case shadow-lg hover:scale-[1.02] transition-transform"
          >
            <Home className="w-4 h-4" />
            Back to Basecamp
          </Link>
        </div>

        <div className="pt-8 border-t border-base-300">
          <p className="text-xs opacity-40 uppercase tracking-widest font-semibold">
            Quick-tripper &bull; Serverless Travel
          </p>
        </div>
      </div>
    </div>
  );
}
