import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Render main app', () => {
  render(<App />);
});
