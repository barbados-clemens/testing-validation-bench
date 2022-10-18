import { TestBed } from '@angular/core/testing';
import { NgLibOneModule } from './ng-lib-one.module';
import { D3Component } from './d3.component';

describe(D3Component.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgLibOneModule],
      declarations: [D3Component],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(D3Component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
