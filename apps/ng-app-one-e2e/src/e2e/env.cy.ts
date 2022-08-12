describe('env vars', () => {
  it('should have cli args', () => {
    assert.equal(Cypress.env('cliArg'), 'i am from the cli args');
  });

  it('should have cypress.env.json vars', () => {
    assert.equal(
      Cypress.env('cypressEnvJson'),
      'i am from the cypress.env.json file'
    );
  });

  // this shouldn't be here because using --env.<whatever> will override the whole env object (expected behavior)
  it('should not have project.json vars', () => {
    assert.equal(Cypress.env('projectJson'), undefined);
  });
});
