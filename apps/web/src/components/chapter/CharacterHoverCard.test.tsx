/**
 * CharacterHoverCard Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CharacterHoverCard } from './CharacterHoverCard';
import { BrowserRouter } from 'react-router-dom';

const mockCharacter = {
  id: 'liu-bei',
  canonicalName: {
    zh: '刘备',
    en: 'Liu Bei',
  },
  kingdom: 'SHU',
  birthYear: 161,
  deathYear: 223,
  literaryProfile: {
    summary: '蜀汉昭烈帝，仁德之君。以仁义著称，为复兴汉室而战。',
    traits: ['仁德', '谦逊', '坚韧'],
  },
  images: [],
};

const mocks = [
  {
    request: {
      query: expect.any(Object),
      variables: {
        id: 'liu-bei',
      },
    },
    result: {
      data: {
        character: mockCharacter,
      },
    },
  },
];

describe('CharacterHoverCard', () => {
  const mockAnchorElement = document.createElement('span');
  mockAnchorElement.getBoundingClientRect = vi.fn(() => ({
    top: 100,
    left: 100,
    bottom: 120,
    right: 150,
    width: 50,
    height: 20,
    x: 100,
    y: 100,
    toJSON: () => {},
  }));

  const mockOnClose = vi.fn();

  it('should display loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="liu-bei"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display character name in Chinese', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="liu-bei"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('刘备')).toBeInTheDocument();
    });
  });

  it('should display character name in English', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="liu-bei"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Liu Bei')).toBeInTheDocument();
    });
  });

  it('should display kingdom badge', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="liu-bei"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('蜀')).toBeInTheDocument();
    });
  });

  it('should display life span', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="liu-bei"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/161.*223/)).toBeInTheDocument();
    });
  });

  it('should display quick summary', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="liu-bei"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/蜀汉昭烈帝/)).toBeInTheDocument();
    });
  });

  it('should display character traits', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="liu-bei"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('仁德')).toBeInTheDocument();
      expect(screen.getByText('谦逊')).toBeInTheDocument();
      expect(screen.getByText('坚韧')).toBeInTheDocument();
    });
  });

  it('should display link to full profile', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="liu-bei"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      const link = screen.getByText('View Full Profile').closest('a');
      expect(link).toHaveAttribute('href', '/characters/liu-bei');
    });
  });

  it('should handle errors gracefully', async () => {
    const errorMocks = [
      {
        request: {
          query: expect.any(Object),
          variables: {
            id: 'invalid-id',
          },
        },
        error: new Error('Character not found'),
      },
    ];

    const { container } = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <BrowserRouter>
          <CharacterHoverCard
            characterId="invalid-id"
            anchorElement={mockAnchorElement}
            onClose={mockOnClose}
          />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
