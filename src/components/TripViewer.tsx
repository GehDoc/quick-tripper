import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { FiTrash2 as Trash2 } from 'react-icons/fi';
import { Logo } from '@/components/Logo';
import { Trip } from '@/types/trip';

interface TripViewerProps {
  trip: Trip;
  onDelete: (id: string) => void;
}

/**
 * Custom sanitization schema.
 * We block all iframes by default and only allow them via our custom 'a' component.
 * We also block images to respect the 'No illustration' rule.
 */
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: defaultSchema.tagNames?.filter((tag) => tag !== 'iframe' && tag !== 'img'),
};

export const TripViewer: React.FC<TripViewerProps> = React.memo(({ trip, onDelete }) => {
  // Extract the map from the content for side-by-side layout
  const mapMatch = trip.content.match(/\[.*?\]\((https:\/\/www\.google\.com\/maps\/dir\/.*?)\)/);
  const mapUrl = mapMatch ? mapMatch[1] : null;
  const notesContent = mapMatch ? trip.content.replace(mapMatch[0], '').trim() : trip.content;

  // Optimized embed URL
  let embedUrl = '';
  if (mapUrl && mapUrl.includes('google.com/maps/dir/')) {
    const parts = mapUrl.split('google.com/maps/dir/')[1].split('/');
    const saddr = encodeURIComponent(parts[0]?.trim() || '');
    const daddr = encodeURIComponent(parts[1]?.trim() || '');
    embedUrl = `https://www.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
  }

  return (
    <div className="flex flex-col xl:grid xl:grid-cols-12 xl:flex-grow xl:overflow-hidden bg-base-100 rounded-2xl shadow-2xl border border-base-300">
      {/* Right Pane (Map): Moves to top on mobile/tablet */}
      <div className="order-1 xl:order-2 xl:col-span-8 2xl:col-span-9 bg-base-300/10 relative min-h-[300px] sm:min-h-[400px] xl:min-h-0 aspect-video xl:aspect-auto border-b xl:border-b-0 border-base-300">
        {embedUrl ? (
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-grow bg-base-300/30 overflow-hidden relative">
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={mapUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm absolute bottom-4 xl:bottom-6 left-1/2 -translate-x-1/2 gap-2 shadow-2xl opacity-90 hover:opacity-100 transition-all border-none scale-100 xl:scale-110 px-6 xl:px-8 z-10"
              >
                <Logo className="w-4 h-4" /> Open Detailed Route
              </a>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full opacity-30 italic text-sm">
            No route data found
          </div>
        )}
      </div>

      {/* Left Pane (Notes): Stays below map on small screens, side-by-side on XL */}
      <div className="order-2 xl:order-1 xl:col-span-4 2xl:col-span-3 flex flex-col xl:border-r border-base-300 min-h-0">
        <div className="bg-base-200/50 px-6 py-4 border-b border-base-300 flex justify-between items-center flex-none">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-black text-primary/60">
              Arrival Details
            </span>
            <h2 className="text-sm font-bold text-base-content/80 truncate">
              {trip.stop || 'Destination'}
            </h2>
          </div>
          <button
            onClick={() => onDelete(trip.id)}
            className="btn btn-ghost btn-xs btn-circle text-error/40 hover:text-error transition-colors"
            title="Remove trip"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="xl:flex-grow xl:overflow-y-auto p-6 md:p-8 custom-scrollbar bg-base-100">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-bold opacity-40">Departing from</span>
            <p className="text-xs font-medium text-primary leading-tight">{trip.start}</p>
          </div>

          <article className="prose prose-sm max-w-none text-base-content leading-relaxed">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
              components={{
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold mt-2 mb-3 border-b border-base-content/10 pb-1">
                    {children}
                  </h3>
                ),
                ul: ({ children }) => <ul className="list-disc space-y-1 mb-4 ml-4">{children}</ul>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                p: ({ children }) => <p className="mb-4">{children}</p>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {notesContent}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
});

TripViewer.displayName = 'TripViewer';
