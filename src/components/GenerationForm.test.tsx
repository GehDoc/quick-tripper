import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { GenerationForm } from './GenerationForm';

describe('GenerationForm', () => {
  it('renders correctly with initial props', () => {
    render(
      <GenerationForm
        prompt="Initial prompt"
        onPromptChange={() => {}}
        onGenerate={() => {}}
        isLoading={false}
      />,
    );
    const input = screen.getByPlaceholderText(/Ex: A 4-day hike itinerary/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Initial prompt');
    expect(screen.queryByRole('status')).not.toBeInTheDocument(); // spinner check
  });

  it('calls onPromptChange when input changes', () => {
    const handleChange = vi.fn();
    render(
      <GenerationForm
        prompt=""
        onPromptChange={handleChange}
        onGenerate={() => {}}
        isLoading={false}
      />,
    );
    const input = screen.getByPlaceholderText(/Ex: A 4-day hike itinerary/i);
    fireEvent.change(input, { target: { value: 'New prompt' } });
    expect(handleChange).toHaveBeenCalledWith('New prompt');
  });

  it('calls onGenerate when button is clicked', () => {
    const handleGenerate = vi.fn();
    render(
      <GenerationForm
        prompt="Ready"
        onPromptChange={() => {}}
        onGenerate={handleGenerate}
        isLoading={false}
      />,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleGenerate).toHaveBeenCalled();
  });

  it('shows loading state and disables input/button', () => {
    render(
      <GenerationForm
        prompt="Processing"
        onPromptChange={() => {}}
        onGenerate={() => {}}
        isLoading={true}
      />,
    );
    const input = screen.getByPlaceholderText(/Ex: A 4-day hike itinerary/i);
    const button = screen.getByRole('button');

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(button.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(
      <GenerationForm
        prompt=""
        onPromptChange={() => {}}
        onGenerate={() => {}}
        isLoading={false}
        error="Something went wrong"
      />,
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
