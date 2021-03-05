import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';

test('renders app with out fail', () => {
  render(<MockedProvider mocks={[]} addTypename={false}>
    <App />
     </MockedProvider>);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
