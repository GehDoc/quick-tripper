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
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
            components={{
              // Typography Scaling & Spacing Refinements
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mt-8 mb-4 border-b border-base-content/10 pb-2">
                  {children}
                </h3>
              ),
              ul: ({ children }) => <ul className="list-disc space-y-2 mb-6">{children}</ul>,
              li: ({ children }) => <li className="ml-4">{children}</li>,
              p: ({ children }) => {
                // If a child is a map (wrapped in our custom <a>), render as <div> to avoid <p> nesting
                const hasMap = React.Children.toArray(children).some(
                  (child) =>
                    React.isValidElement(child) &&
                    child.type === 'a' &&
                    (child.props as { href?: string }).href?.includes('google.com/maps'),
                );
                return hasMap ? (
                  <div className="mb-6">{children}</div>
                ) : (
                  <p className="mb-6">{children}</p>
                );
              },
              iframe: () => null,
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
                    const saddr = encodeURIComponent(parts[0].trim());
                    const daddr = encodeURIComponent(parts[1].trim());
                    embedUrl = `https://www.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
                  }

                  return (
                    <span className="block my-8">
                      <span className="block w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg border border-base-300">
                        <iframe
                          src={embedUrl}
                          className="w-full h-full border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </span>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm gap-2 mt-4 no-underline shadow-sm hover:scale-[1.02] transition-transform inline-flex"
                      >
                        <Logo className="w-3 h-3" /> Ouvrir l&apos;itinéraire détaillé dans Google
                        Maps
                      </a>
                    </span>
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
