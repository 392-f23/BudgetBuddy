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

    it("Check neutral budget buddy image renders if expenses are 2/3 of budget", () => {
        // Mocking or setting up necessary variables and functions
        const expenses = 300; // Set expenses different from budget
        const budget = 500; // Set budget
        const logoNeutral = "/src/assets/budget buddy.png"; 
    
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
    
        // Asserting that the logo image source does not match the 'evil' BudgetBuddy icon
        expect(logoSrc).toBe(logoNeutral);
      });
      it("Check good budget buddy image renders if expenses are 1/3 of budget", () => {
        // Mocking or setting up necessary variables and functions
        const expenses = 100; // Set expenses different from budget
        const budget = 300; // Set budget
        const logoGood = "/src/assets/budget_buddy_good.png"; 
    
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
    
        // Asserting that the logo image source does not match the 'evil' BudgetBuddy icon
        expect(logoSrc).toBe(logoGood);
      });
    
  });