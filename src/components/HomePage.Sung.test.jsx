import { it} from 'vitest';
import { render, screen } from '@testing-library/react';
import {act} from 'react-dom/test-utils'
import App from "../App"
import {isOnboarded, checkIfLoggedIn} from "../utility/firebase"; 
import { fetchUserData } from '../utility/query';
vi.mock("../utility/firebase"); 
vi.mock("../utility/query"); 
describe("testing main home page", async () => {
    it("when a user is already logged-in and is already registered with back-end database, then the customized welcome message should appear in home page", async () => {
         //mock some utility functions called by app! 
        isOnboarded.mockReturnValue([true, false, null]); 
        checkIfLoggedIn.mockReturnValue([true, false, null]); 
        //mocking that we have non-empty user object! 
        fetchUserData.mockReturnValue([true, false, null]);  
    //let's just pretend user by passed the googl auth => so isSignedIn key is set to True in local session storage!
      //Furthermore, we just need to check that there exists a welcome text with exact name as that of the name field value of local session
      //storage => in this case, "test-user"! 
      const uid = "muYHJiXz55TjZDr9CwVijrru1tc2"
      const name = "John Steve"
      
      //create a mock so whenever we retrieve fields of local storage, we will return hard coded vals of sample logged in registered user! 
      const localStorageMock = {
        getItem: (key) => {
            if(key === "uid"){
                return uid; 
            }if(key === "isSignedIn"){
                return true; 
            }
            if(key === "name"){
                return name; 
            }
        },
        setItem: () => {},
        clear: () => {}, 
    }; 
      Object.defineProperty(window, 'localStorage', {value: localStorageMock});
      await act( async () => {
        render(<App />)
      }); 
      //make sure user is routed to home page! 
      const {pathname} = window.location; 
      expect(pathname).toBe("/home")
      //expect the home page screen to display customized welcome back message! 
      await screen.findByText(/Hello, John Steve/); 

    });
})