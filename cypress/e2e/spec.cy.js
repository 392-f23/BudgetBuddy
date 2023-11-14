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