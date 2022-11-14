import { MountConfig } from 'cypress/angular';
import { BtnComponent } from './btn.component';

describe(BtnComponent.name, () => {
  const config: MountConfig<BtnComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(BtnComponent, config);
  })
})
