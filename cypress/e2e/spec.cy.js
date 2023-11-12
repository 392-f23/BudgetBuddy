describe('when user is null login screen should render', () => {
  it('check for null user entering app', () => {
    cy.visit("http://localhost:5173");
    //if user is null in local browser session storage, user should get redirected to login page that's active! 
    //we can also directly check that the local session storage doesn't have "uid" key in it so trying to fetch it with "getItem" call
    //will return null value, which is precisely our expect statement checks for! 
    cy.url().should("include", "/login");
    cy.window().its("localStorage").then(localStorage => {
      expect(localStorage.getItem("uid")).equal(null);
    });
  });

  it("when user is routed to /home page, then they should view Welcome Back! message", () => {
    //let's just pretend user by passed the googl auth => so isSignedIn key is set to True in local session storage!
    //Furthermore, we just need to check that there exists a welcome text with exact name as that of the name field value of local session
    //storage => in this case, "test-user"! 
    window.localStorage.setItem("isSignedIn", true);
    window.localStorage.setItem("uid", "muYHJiXz55TjZDr9CwVijrru1tc2");
    window.localStorage.setItem("name", "test-user");
    //we aren't doing actual 3-rd party googl auth => we are intercepting in and returning a mock up! 
    cy.intercept("POST", "https://accounts.google.com/*", (req) => {
      req.reply({
        status: 200,
        body: {
          auth: {
            currentUser: {
              uid: "muYHJiXz55TjZDr9CwVijrru1tc2"
            }
          }
        }
      });
    });
    //visit the root with vals set in local session storage should redirect to home page and have the welcome message be personalized
    //using the name field of local session storage! 
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/home");
    cy.contains(`Welcome back, ${window.localStorage.getItem("name")}`);
  });
});

describe('When visiting insights page, menu button should work and redirect them to /insights', () => {
  it("when user is routed to /home page, then they should view Welcome Back! message", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    window.localStorage.setItem("isSignedIn", true);
    window.localStorage.setItem("uid", "muYHJiXz55TjZDr9CwVijrru1tc2");
    window.localStorage.setItem("name", "test-user");
    window.localStorage.setItem("Spendin", [{ "category": "Food", "amount": -30, "date": "2023-10-20", "subcategory": "Dine-Out" }]);
    //we aren't doing actual 3-rd party googl auth => we are intercepting in and returning a mock up! 
    cy.intercept("POST", "https://accounts.google.com/*", (req) => {
      req.reply({
        status: 200,
        body: {
          auth: {
            currentUser: {
              uid: "muYHJiXz55TjZDr9CwVijrru1tc2"
            }
          }
        }
      });
    });

    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/home");
    cy.get('[data-cy=Menu]').click();
    cy.get('[data-cy=Name]').should('contain', `Hello, ${window.localStorage.getItem("name")}!`);
    cy.get('[data-cy=insights]').click();
    cy.url().should("include", "/insights");
    cy.get('[data-cy=spendingInsights]').should('contain', "Spending Insights");
  });
}); 