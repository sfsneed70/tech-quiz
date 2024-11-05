
import Quiz from "../../client/src/components/Quiz";

const questions = [
  {
    question: "What is the output of print(2 ** 3)?",
    answers: [
      { text: "6", isCorrect: false },
      { text: "8", isCorrect: true },
      { text: "9", isCorrect: false },
      { text: "12", isCorrect: false },
    ],
  },
  {
    question: "Which of the following is a mutable data type in Python?",
    answers: [
      { text: "str", isCorrect: false },
      { text: "tuple", isCorrect: false },
      { text: "list", isCorrect: true },
      { text: "int", isCorrect: false },
    ],
  },
];

describe("Quiz", () => {
  it("should render the Quiz component", () => {
cy.mount(<Quiz />);
  
  });
});