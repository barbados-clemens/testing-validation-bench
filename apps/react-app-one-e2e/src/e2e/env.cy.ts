describe('env vars', () => {
  it('should have project.json vars', () => {
    assert.equal(Cypress.env('projectJson'), 'i am project json value');
  });
});
