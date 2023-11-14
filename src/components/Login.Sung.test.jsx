
import { it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from "../App" 

describe("Redirect test", () => {
    it("when a user tries to reach for root route, they should get redirected to login page!", async () => {
        //mimic user hitting the home route by rendering the overarching app component! 
        render(<App />); 
        await screen.findByText(/Sign in below/); 
    }); 
}); 