import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { FiTrash2 as Trash2 } from 'react-icons/fi';
import { Logo } from '@/components/Logo';
import { Trip } from '@/types/trip';

interface TripViewerProps {
  trip: Trip;
  onDelete: (id: string) => void;
}

export const TripViewer: React.FC<TripViewerProps> = React.memo(({ trip, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-2xl relative border border-base-300">
      <div className="card-body p-6 md:p-12">
        <button
          onClick={() => onDelete(trip.id)}
          className="btn btn-ghost btn-sm btn-circle absolute top-4 right-4 text-error/40 hover:text-error transition-colors"
          title="Remove data entry"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <article className="prose max-w-none text-base-content leading-relaxed">
          <h1 className="text-3xl font-bold mb-4">{trip.title}</h1>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              iframe: ({ src, ...props }) => {
                const isGoogleMap =
                  src?.startsWith('https://www.google.com/maps/embed') ||
                  src?.startsWith('https://www.google.com/maps?') ||
                  src?.startsWith('https://maps.google.com/');

                if (!isGoogleMap) {
                  return (
                    <div className="p-4 bg-error/10 text-error text-xs rounded-box">
                      Blocked unsafe iframe: {src}
                    </div>
                  );
                }

                return (
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg my-6 border border-base-300">
                    <iframe
                      src={src}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      {...props}
                    />
                  </div>
                );
              },
              a: ({ href, children }) => {
                const isGoogleMap =
                  href?.startsWith('https://www.google.com/maps/embed') ||
                  href?.startsWith('https://www.google.com/maps?') ||
                  href?.startsWith('https://maps.google.com/') ||
                  href?.includes('google.com/maps/dir/');

                if (isGoogleMap && href) {
                  // Transform search/dir URL to embed URL if possible
                  let embedUrl = href;
                  if (href.includes('google.com/maps/dir/')) {
                    const parts = href.split('google.com/maps/dir/')[1].split('/');
                    const saddr = parts[0];
                    const daddr = parts[1];
                    embedUrl = `https://www.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
                  }

                  return (
                    <div className="flex flex-col gap-4 my-8">
                      <div className="w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg border border-base-300">
                        <iframe
                          src={embedUrl}
                          className="w-full h-full border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm gap-2 self-start no-underline shadow-sm hover:scale-[1.02] transition-transform"
                      >
                        <Logo className="w-3 h-3" /> Ouvrir l&apos;itinéraire détaillé dans Google
                        Maps
                      </a>
                    </div>
                  );
                }

                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {trip.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
});

TripViewer.displayName = 'TripViewer';
