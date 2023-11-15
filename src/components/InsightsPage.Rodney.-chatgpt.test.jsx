import React from 'react';
import { mount } from 'vitest/enzyme';
import { MemoryRouter } from 'vitest/react-router-dom'; // Import the routing component
import InsightsPage from './InsightsPage'; // Update the import path based on your project structure

test('InsightsPage displays "Spending Insights"', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/insights']}>
      <InsightsPage />
    </MemoryRouter>
  );

  // Use enzyme or vitest's query functions to assert the presence of the text
  const textElement = wrapper.find('.insights-page-text'); // Update the selector based on your actual class or element structure
  expect(textElement.text()).toBe('Spending Insights');
});