import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders branding and version', () => {
    render(<Navbar apiKey="" onApiKeyChange={() => {}} />);
    expect(screen.getByText(/Quick-tripper/i)).toBeInTheDocument();
    expect(screen.getByText(/v\d+\.\d+\.\d+/)).toBeInTheDocument();
  });

  it('renders the API key input with correct value', () => {
    render(<Navbar apiKey="test-key" onApiKeyChange={() => {}} />);
    const input = screen.getByPlaceholderText(/HuggingFace API Token/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test-key');
  });

  it('calls onApiKeyChange when input changes', () => {
    const handleChange = vi.fn();
    render(<Navbar apiKey="" onApiKeyChange={handleChange} />);
    const input = screen.getByPlaceholderText(/HuggingFace API Token/i);

    fireEvent.change(input, { target: { value: 'new-key' } });
    expect(handleChange).toHaveBeenCalledWith('new-key');
  });

  it('contains the GitHub link', () => {
    render(<Navbar apiKey="" onApiKeyChange={() => {}} />);
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });
});
