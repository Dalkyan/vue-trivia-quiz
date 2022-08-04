// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Trivia Quiz");
  });
});
describe("Check summary when haven't played", () => {
  it("visits the summaryView url", () => {
    cy.visit("/summary");
    cy.get("h2").should("contain.text", "No results to show");
  });
});

describe("Opens the app, selects one answer for each question and submits the answers", () => {
  it("visits the app root url and clicks the start button", () => {
    cy.visit("/");
    cy.contains("button", "Start").click();
  });
  it("Displays fetched questions and answers 9 questions", () => {
    cy.url().should("contain", "quiz");
    for (let index = 0; index < 9; index++) {
      cy.get("button").first().click();
      cy.get("button").contains("Next").click();
    }
  });
  it("At 10th question picks 2nd answer and is not able to click next", () => {
    cy.get("button").eq(1).click();
    cy.get("button").contains("Next").should("contain.class", "disabled");
  });
  it("Is able to click submit answers and goes to summaryView", () => {
    cy.get("a").contains("Submit").click();
    cy.url().should("contain", "summary");
  });
  it("Displays summaryView and clicks to show results", () => {
    cy.get("h2").contains("score").click();
    cy.url().should("contain", "summary");
  });
});
