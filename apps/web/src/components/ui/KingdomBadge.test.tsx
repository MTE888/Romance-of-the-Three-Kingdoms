/**
 * KingdomBadge Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KingdomBadge } from './KingdomBadge';

describe('KingdomBadge', () => {
  it('should render Wei kingdom badge correctly', () => {
    render(<KingdomBadge kingdom="WEI" />);

    const badge = screen.getByText('魏');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-wei');
    expect(badge).toHaveClass('text-white');
  });

  it('should render Shu kingdom badge correctly', () => {
    render(<KingdomBadge kingdom="SHU" />);

    const badge = screen.getByText('蜀');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-shu');
    expect(badge).toHaveClass('text-white');
  });

  it('should render Wu kingdom badge correctly', () => {
    render(<KingdomBadge kingdom="WU" />);

    const badge = screen.getByText('吴');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-wu');
    expect(badge).toHaveClass('text-white');
  });

  it('should have correct styling classes', () => {
    const { container } = render(<KingdomBadge kingdom="SHU" />);

    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('items-center');
    expect(badge).toHaveClass('px-3');
    expect(badge).toHaveClass('py-1');
    expect(badge).toHaveClass('rounded-full');
  });

  it('should render different kingdoms with different colors', () => {
    const { rerender } = render(<KingdomBadge kingdom="WEI" />);
    expect(screen.getByText('魏')).toHaveClass('bg-wei');

    rerender(<KingdomBadge kingdom="SHU" />);
    expect(screen.getByText('蜀')).toHaveClass('bg-shu');

    rerender(<KingdomBadge kingdom="WU" />);
    expect(screen.getByText('吴')).toHaveClass('bg-wu');
  });
});
