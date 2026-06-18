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
    <div className="flex-grow flex flex-col 2xl:grid 2xl:grid-cols-12 2xl:flex-grow 2xl:overflow-hidden bg-base-100 border border-base-300">
      {/* Right Pane (Map): Landscape first, side-by-side above 2XL */}
      <div className="order-1 2xl:order-2 2xl:col-span-9 bg-base-300/10 relative min-h-[400px] 2xl:min-h-0 aspect-video 2xl:aspect-auto border-b 2xl:border-b-0 border-base-300">
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
                className="btn btn-secondary absolute bottom-6 2xl:bottom-10 left-1/2 -translate-x-1/2 gap-3 shadow-2xl opacity-90 hover:opacity-100 transition-all border-none scale-100 2xl:scale-110 px-8 2xl:px-12 z-10"
              >
                <Logo className="w-5 h-5" /> Open Detailed Route
              </a>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full opacity-30 italic text-sm">
            No route data found
          </div>
        )}
      </div>

      {/* Left Pane (Notes): Below on mobile/tablet, side-by-side above 2XL */}
      <div className="order-2 2xl:order-1 2xl:col-span-3 flex flex-col 2xl:border-r border-base-300 min-h-0">
        <div className="bg-base-200/50 px-6 py-5 border-b border-base-300 flex justify-between items-center flex-none">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest font-black text-primary/80">
              Arrival Details
            </span>
            <h2 className="text-base font-bold text-base-content/80 truncate">
              {trip.stop || 'Destination'}
            </h2>
          </div>
          <button
            onClick={() => onDelete(trip.id)}
            className="btn btn-ghost btn-sm btn-circle text-error/40 hover:text-error transition-colors"
            title="Remove trip"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="2xl:flex-grow 2xl:overflow-y-auto p-6 2xl:p-10 custom-scrollbar bg-base-100">
          <div className="mb-8">
            <span className="text-xs uppercase font-bold text-base-content/50 tracking-wider">
              Departing from
            </span>
            <p className="text-sm font-semibold text-primary mt-1">{trip.start}</p>
          </div>

          <article className="prose max-w-none text-base-content leading-relaxed">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
              components={{
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold mt-4 mb-4 border-b border-base-content/10 pb-2">
                    {children}
                  </h3>
                ),
                ul: ({ children }) => <ul className="list-disc space-y-2 mb-6 ml-4">{children}</ul>,
                li: ({ children }) => <li className="mb-2">{children}</li>,
                p: ({ children }) => <p className="mb-6">{children}</p>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline font-bold"
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
