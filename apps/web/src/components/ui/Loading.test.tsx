/**
 * Loading Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('should render loading spinner', () => {
    render(<Loading />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<Loading />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', '加载中...');
  });

  it('should have correct styling classes', () => {
    const { container } = render(<Loading />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('justify-center');
    expect(wrapper).toHaveClass('items-center');
    expect(wrapper).toHaveClass('min-h-[200px]');
  });

  it('should display loading text in both languages', () => {
    render(<Loading />);

    expect(screen.getByText('加载中...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should have animated spinner', () => {
    render(<Loading />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('animate-spin');
  });
});
