import {TestBed} from '@angular/core/testing';
import { MountConfig } from 'cypress/angular';
import { BtnComponent } from './btn.component';

describe(BtnComponent.name, () => {
  const config: MountConfig<BtnComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     TestBed.overrideComponent(BtnComponent, {add: { providers: config.providers}});
cy.mount(BtnComponent, config);
  })
})
