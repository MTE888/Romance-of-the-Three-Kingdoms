/**
 * ErrorMessage Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message with custom message', () => {
    render(<ErrorMessage message="Something went wrong" />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render default error message when no message provided', () => {
    render(<ErrorMessage />);

    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
  });

  it('should have correct alert role', () => {
    const { container } = render(<ErrorMessage message="Error!" />);

    const alert = container.firstChild as HTMLElement;
    expect(alert).toHaveAttribute('role', 'alert');
  });

  it('should display error icon', () => {
    const { container } = render(<ErrorMessage message="Error!" />);

    // Check for SVG icon presence
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have correct styling for error state', () => {
    const { container } = render(<ErrorMessage message="Error!" />);

    const alert = container.firstChild as HTMLElement;
    expect(alert).toHaveClass('bg-red-50');
    expect(alert).toHaveClass('border-red-200');
  });

  it('should display long error messages', () => {
    const longMessage = 'This is a very long error message that should still be displayed correctly without any issues in the UI layout';

    render(<ErrorMessage message={longMessage} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('should handle empty string message', () => {
    render(<ErrorMessage message="" />);

    // Should display default message or empty state
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});
