import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { WorkspaceActions } from './WorkspaceActions';

describe('WorkspaceActions', () => {
  it('renders correctly', () => {
    render(
      <WorkspaceActions
        totalTrips={0}
        onExport={() => {}}
        onImport={() => {}}
        onShare={() => {}}
      />,
    );
    expect(screen.getByText(/Serverless Workspace/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Share Active Link/i })).toBeDisabled();
  });

  it('enables buttons when totalTrips > 0', () => {
    render(
      <WorkspaceActions
        totalTrips={1}
        onExport={() => {}}
        onImport={() => {}}
        onShare={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: /Export/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /Share Active Link/i })).not.toBeDisabled();
  });

  it('calls onExport when Export button is clicked', () => {
    const handleExport = vi.fn();
    render(
      <WorkspaceActions
        totalTrips={1}
        onExport={handleExport}
        onImport={() => {}}
        onShare={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Export/i }));
    expect(handleExport).toHaveBeenCalled();
  });

  it('calls onShare when Share button is clicked', () => {
    const handleShare = vi.fn();
    render(
      <WorkspaceActions
        totalTrips={1}
        onExport={() => {}}
        onImport={() => {}}
        onShare={handleShare}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Share Active Link/i }));
    expect(handleShare).toHaveBeenCalled();
  });

  it('calls onImport when a file is selected', () => {
    const handleImport = vi.fn();
    render(
      <WorkspaceActions
        totalTrips={0}
        onExport={() => {}}
        onImport={handleImport}
        onShare={() => {}}
      />,
    );
    const file = new File(['{}'], 'test.json', { type: 'application/json' });
    const input = screen.getByLabelText(/Import/i); // The label contains the input

    // Note: Since input is hidden, we might need to target it specifically or via label
    fireEvent.change(input, { target: { files: [file] } });
    expect(handleImport).toHaveBeenCalled();
  });
});
