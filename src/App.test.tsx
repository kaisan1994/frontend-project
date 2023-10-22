import { cleanup, render, screen } from '@testing-library/react';
import App from './App';

test('Loading before initialize google map setting', async () => {
  render(<App />);
  const startingPointInput = screen.getByRole('progressbar');
  expect(startingPointInput).toBeInTheDocument();

  cleanup();
});
