describe("Quiz Test", () => {
  context("e2e Quiz Setup", () => {
    beforeEach(() => {
      // visit the app
      cy.visit("/");
    });

    it("should render the Quiz start page", () => {
      // verify start quiz button
      cy.get(".btn").should("have.text", "Start Quiz");
    });

    it("should render the first Quiz question card", () => {
      // click start quiz button
      cy.get(".btn").should("have.text", "Start Quiz").click();
      // verify question card is visible
      cy.get(".card").should("be.visible");
    });

    it("should complete quiz and show results", () => {
      cy.get(".btn").should("have.text", "Start Quiz").click();
      // click answer 2 for all 10 questions
      for (let i = 0; i < 10; i++) {
        // make sure question card is visible
        cy.get(".card").should("be.visible");
        // click answer 2
        cy.get(".btn").contains("2").click();
      }
      // verify quiz completed message
      cy.get("h2").should("have.text", "Quiz Completed");
      // verify take new quiz button
      cy.get(".btn").should("have.text", "Take New Quiz");
    });

    it("clicking take new quiz should start new quiz", () => {
      cy.get(".btn").should("have.text", "Start Quiz").click();
      // click answer 2 for all 10 questions
      for (let i = 0; i < 10; i++) {
        // make sure question card is visible
        cy.get(".card").should("be.visible");
        // click answer 2
        cy.get(".btn").contains("2").click();
      }
      // verify quiz completed message
      cy.get("h2").should("have.text", "Quiz Completed");
      // verify take new quiz button
      cy.get(".btn").should("have.text", "Take New Quiz").click();
      // verify new quiz question card
      cy.get(".card").should("be.visible");
    });
  });
});
