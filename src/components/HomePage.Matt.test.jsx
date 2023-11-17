import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import MenuContainer
 from './MenuContainer';
describe("Check budget buddy image", () => {
    it("Check evil budget buddy image renders if expenses = budget", async () => {
        // Mocking or setting up necessary variables and functions
        const expenses = 500; // Set expenses
        const budget = 500; // Set budget
        const logoEvil = "/src/assets/budget_buddy_evil.png"; 
        // Rendering the component
        render(
          <MemoryRouter>
            <MenuContainer data={{ budget }} totalExpenses={expenses} />
          </MemoryRouter>
        );
  
        // Get the logo image element
        const logoImage = screen.getByRole("img");

        // Get the 'src' attribute of the logo image
        const logoSrc = logoImage.getAttribute("src");

        // Asserting that the logo image source matches the 'angry version' of BudgetBuddy icon
        expect(logoSrc).toBe(logoEvil);

    });
  });