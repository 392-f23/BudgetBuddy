import {describe, expect, it} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {toBeVisible} from '@testing-library/jest-dom/matchers'
import { act } from 'react-dom/test-utils';
import HomePage from '../pages/HomePage';
import { Component, useState, useEffect  } from 'react';
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';
import { fetchUserData } from '../utility/query';
import { mount, shallowMount  } from '@vue/test-utils';
// import '@testing-library/jest-dom/extend-expect';

console.log(toBeVisible)
expect.extend(toBeVisible)

vi.mock('../utility/query');

const mockData =  {
            "income": 2000,
            "displayName": "test",
            "email": "test@u.northwestern.edu",
            "budgetByCategory": {
                "Food": 500,
                "Rent": 1000,
                "Transport": 200
            },
            "budget": 1100,
            "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocLnwK7QYS82B18t9PrNaxtXTMhjDHaQ8-VHLStkEWE=s96-c",
            "onboarded": true,
            "expenses": {
                "Transport": {
                    "subExpense": {
                        "CTA": 0,
                        "Uber": 0
                    },
                    "total": 0
                },
                "Rent": {
                    "total": 0,
                    "subExpense": {
                        "BaseRent": 0,
                        "Utilities": 0
                    }
                },
                "Food": {
                    "total": -30,
                    "subExpense": {
                        "Dine-Out": -30,
                        "Groceries": 0
                    }
                }
            },
            "SpendingHistory": [
                {
                    "subcategory": "Dine-Out",
                    "amount": -30,
                    "category": "Food",
                    "date": "2023-10-20"
                }
            ]
}

beforeEach(() => {
    fetchUserData.mockReturnValue(mockData);
})


 
describe('Menu test', () => {
    
  it("Test that the menu component is hidden untill the user clicks a button, then have the menu component renderd to the screen. ", async () => {
    const route = '/home';

    const { container } = render(<MemoryRouter initialEntries={[route]}>
        <HomePage />
    </MemoryRouter>);

    await screen.findByText(/BudgetBuddy/i); // Test page renders
    // await screen.findByText(/ejwfjewkfjwkejwk/i); // Test page renders fails
    
    const header = screen.getByTestId('MenuComp'); // Adjust the selector as needed
    const menuButton = container.querySelector('[data-cy="Menu"]'); // Adjust the selector as needed

    var isClosed = window.getComputedStyle(header).getPropertyValue('width') == "100%"

    //Test fails when menubutton is not clicked
    expect(isClosed).toBe(true)
        act(() => {
            menuButton.click();
        });
    isClosed = window.getComputedStyle(header).getPropertyValue('width') == "100%"
    expect(isClosed).toBe(false)
    // Check if the element is hidden
    // expect(element).not.toBeVisible(); // This assertion checks that the element is hidden
        

  });

});