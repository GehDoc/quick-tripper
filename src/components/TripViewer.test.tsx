import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { TripViewer } from './TripViewer';
import { Trip } from '@/types/trip';

const mockTrip: Trip = {
  id: 'trip-1',
  prompt: 'Tokyo trip',
  title: 'Tokyo',
  content:
    '# Tokyo Trip\n\n[Google Maps link](https://www.google.com/maps/dir/Tokyo/Kyoto/)\n\n<iframe src="https://www.google.com/maps/embed?pb=1"></iframe>',
  createdAt: '2023-10-27',
};

describe('TripViewer', () => {
  it('renders trip title and markdown content', () => {
    render(<TripViewer trip={mockTrip} onDelete={() => {}} />);
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText(/Tokyo Trip/i)).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<TripViewer trip={mockTrip} onDelete={handleDelete} />);
    const deleteButton = screen.getByTitle(/Remove data entry/i);
    deleteButton.click();
    expect(handleDelete).toHaveBeenCalledWith('trip-1');
  });

  it('renders Google Maps iframe from a link and BLOCKS raw iframe', () => {
    const { container } = render(<TripViewer trip={mockTrip} onDelete={() => {}} />);

    // The raw <iframe src="https://www.google.com/maps/embed?pb=1"></iframe> should be removed by sanitizer
    // The link [Google Maps link](https://www.google.com/maps/dir/Tokyo/Kyoto/) should be transformed into an iframe
    const iframes = container.querySelectorAll('iframe');
    expect(iframes.length).toBe(1);

    // Verify the one allowed iframe is the one from our link transformer
    expect(iframes[0]).toHaveAttribute(
      'src',
      'https://www.google.com/maps?saddr=Tokyo&daddr=Kyoto&output=embed',
    );
  });

  it('blocks unsafe content and non-Google iframes', () => {
    const unsafeTrip: Trip = {
      ...mockTrip,
      content:
        '# Unsafe\n<script>alert("xss")</script>\n<iframe src="https://malicious.com"></iframe>\n<img src="tracker.png" />',
    };
    const { container } = render(<TripViewer trip={unsafeTrip} onDelete={() => {}} />);

    // These should all be stripped by the sanitizer or components
    expect(container.querySelector('script')).not.toBeInTheDocument();
    expect(container.querySelector('iframe')).not.toBeInTheDocument();
    expect(container.querySelector('img')).not.toBeInTheDocument();

    // Verify the text is still there but sanitized
    expect(screen.getByText('Unsafe')).toBeInTheDocument();
  });
});
