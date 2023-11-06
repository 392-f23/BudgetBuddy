import {describe, expect, it} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import InsightsPage from '../pages/InsightsPage';
import { Component } from 'react';
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';



vi.mock('firebase/firestore');

class mockDocumantSnap {
    constructor() {}
    exists() {
        return true
    }
    data() {
        return {
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
    }
  }

const mockDoc = new mockDocumantSnap

beforeEach(() => {
    getDoc.mockReturnValue(mockDoc);
    doc.mockReturnValue({});
})


 
describe('Insights test', () => {
    
  it("Page should display Spending Insights", async () => {
    const route = '/insights';
    
    // act(() =>{

    // });
    render(<MemoryRouter initialEntries={[route]}>
        <InsightsPage />
    </MemoryRouter>);
    await screen.findByText(/Spending Insights/i);
    // await screen.findByText("EFWJKFBEWKJFKEWKBNFJKWEBFKW"); //TEST FAILS
     

  });

});