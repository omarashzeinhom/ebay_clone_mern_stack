import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app/App';

test('renders learn react link', () => {
  const total = 0; // Provide a value for the 'total' prop
  render(<App total={total} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
