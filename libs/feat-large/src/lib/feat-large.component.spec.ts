import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatLargeComponent } from './feat-large.component';

describe('FeatLargeComponent', () => {
  let component: FeatLargeComponent;
  let fixture: ComponentFixture<FeatLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatLargeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
