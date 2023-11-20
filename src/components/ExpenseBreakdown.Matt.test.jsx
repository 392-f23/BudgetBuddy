import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import ExpenseBreakdown
 from './ExpenseBreakdown';
describe("Check expense linear progress", () => {
    it ("Check linear progress value matches expense value", () => {
        const expense = ["Transport", "100", {"Groceries": "50", "Dine-out": "50"}];
        const budgetCategory = {Rent: 150, Transport: 25, Food: 25};
        render(
            <MemoryRouter>
            <ExpenseBreakdown expense={expense} budgetCategory={budgetCategory}/>
            </MemoryRouter>
        );
        
            // Get the linear progress element
            const linearProgress = screen.getByRole("progressbar");

            // Get the 'value' attribute of the linear progress element
            const linearProgressValue = linearProgress.getAttribute("aria-valuenow");

            // Asserting that the linear progress value matches the expense value
            expect(linearProgressValue).toBe(expense[1]);
    });
});