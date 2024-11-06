import Quiz from "../../client/src/components/Quiz";
import questions from "../fixtures/questions.json";

describe("Quiz Component Test", () => {
  context("Component Quiz Setup", () => {
    beforeEach(() => {
      // intercept the GET request to /api/questions/random and return the questions fixture
      cy.intercept('GET', '/api/questions/random', (req) => {
        req.reply({
          statusCode: 200,
          body: questions
        });
      }).as('getQuestions');

      // mount the Quiz component
      cy.mount(<Quiz />);
    });

    it("should render the Quiz start page", () => {
      // verify start quiz button
      cy.get(".btn").should("have.text", "Start Quiz");
    });

    it("verify contents of first question", () => {
      // click start quiz button
      cy.get(".btn").should("have.text", "Start Quiz").click();
      cy.wait('@getQuestions');
      // verify question card has the correct question
      cy.get(".card h2").should("have.text", "What is the output of print(2 ** 3)?");
    });

    it("should complete quiz and show results", () => {
      cy.get(".btn").should("have.text", "Start Quiz").click();
      cy.wait('@getQuestions');
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
      cy.wait('@getQuestions');
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
