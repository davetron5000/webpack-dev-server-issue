describe("rendering markdown", () => {
  it("renders markdown", () => {
    cy.visit("http://localhost:3000")
    cy.get("#source").type(
      "*This* is markdown:\n* with a\n* bullet\n *list")
    cy.get("input[type=submit]").click()

    cy.get("#preview p").should("contain","This is markdown")
    cy.get("#preview ul li").should("contain","bullet")
  })
})
