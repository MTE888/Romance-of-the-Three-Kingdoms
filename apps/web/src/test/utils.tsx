/**
 * Test Utilities
 * Helper functions for testing React components
 */

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

/**
 * Create a mock Apollo Client for testing
 */
export function createMockApolloClient(mocks: MockedResponse[] = []) {
  return new ApolloClient({
    link: ApolloLink.from([]),
    cache: new InMemoryCache(),
  });
}

/**
 * Wrapper with Router and Apollo Provider
 */
interface AllProvidersProps {
  children: React.ReactNode;
  mocks?: MockedResponse[];
}

function AllProviders({ children, mocks = [] }: AllProvidersProps) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>{children}</BrowserRouter>
    </MockedProvider>
  );
}

/**
 * Custom render function that includes providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { mocks?: MockedResponse[] }
) {
  const { mocks, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => <AllProviders mocks={mocks}>{children}</AllProviders>,
    ...renderOptions,
  });
}

/**
 * Wrapper with only Router (no Apollo)
 */
function RouterWrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

/**
 * Custom render function with only Router
 */
export function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: RouterWrapper,
    ...options,
  });
}

/**
 * Wait for Apollo mock responses
 */
export const waitForApollo = () => new Promise(resolve => setTimeout(resolve, 0));

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
