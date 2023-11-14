import {it,mount, assert } from 'vitest';
import { render, screen } from '@testing-library/react';
import {act} from 'react-dom/test-utils'
import App from '../App';

// Define a visual test
it('App Component', async () => {
  // Mock sessionStorage to simulate a non-logged-in user
  const originalSessionStorage = window.sessionStorage;
  window.sessionStorage = {};
  // Render the component
  await act(async () => {
    render(<App />);
  })
  // Verify that the expected text is present on the screen
  const {pathname} = window.location; 
  expect(pathname).equal("/login");
  await screen.findByText(/Sign in below/i); 
  // Clean up the mock
  window.sessionStorage = originalSessionStorage;
});