import Quiz from "../../client/src/components/Quiz";
import questions from "../fixtures/questions.json";

describe("Quiz", () => {
  context("Component Quiz Setup", () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/questions/random', (req) => {
        req.reply({
          statusCode: 200,
          body: questions
        });
      }).as('getQuestions');

      cy.mount(<Quiz />);
    });

    it("should render the Quiz start page", () => {
      cy.get(".btn").should("have.text", "Start Quiz");
    });

    it("verify contents of first question", () => {
      cy.get(".btn").should("have.text", "Start Quiz").click();
      cy.wait('@getQuestions');
      cy.get(".card h2").should("have.text", "What is the output of print(2 ** 3)?");
    });

    it("should complete quiz and show results", () => {
      cy.get(".btn").should("have.text", "Start Quiz").click();
      cy.wait('@getQuestions');
      // click answer 2 for all 10 questions
      for (let i = 0; i < 10; i++) {
        cy.get(".card").should("be.visible");
        cy.get(".btn").contains("2").click();
      }
      cy.get("h2").should("have.text", "Quiz Completed");
      cy.get(".btn").should("have.text", "Take New Quiz");
    });

    it("clicking take new quiz should start new quiz", () => {
      cy.get(".btn").should("have.text", "Start Quiz").click();
      cy.wait('@getQuestions');
      // click answer 2 for all 10 questions
      for (let i = 0; i < 10; i++) {
        cy.get(".card").should("be.visible");
        cy.get(".btn").contains("2").click();
      }
      cy.get("h2").should("have.text", "Quiz Completed");
      cy.get(".btn").should("have.text", "Take New Quiz").click();
      cy.get(".card").should("be.visible");
    });
  });
});
