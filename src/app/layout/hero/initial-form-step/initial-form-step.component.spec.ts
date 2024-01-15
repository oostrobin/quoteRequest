import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialFormStepComponent } from './initial-form-step.component';

describe('FormComponent', () => {
  let component: InitialFormStepComponent;
  let fixture: ComponentFixture<InitialFormStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialFormStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialFormStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
