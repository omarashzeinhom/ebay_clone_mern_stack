import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './app/App';

interface AppProps {
  total: number;
}

test("renders learn react link and increments total on button click", () => {
  const initialTotal: number = 0;
  render(<App total={initialTotal} />);

  // Check initial state
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  const countDisplay = screen.getByText(initialTotal.toString());
  expect(countDisplay).toBeInTheDocument();

  // Simulate button click
  const button = screen.getByRole('button', { name: /increment/i });
  fireEvent.click(button);

  // Check updated state
  expect(screen.getByText((initialTotal + 1).toString())).toBeInTheDocument(); // Updated count
});
