import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDataFormComponent } from './confirm-data-form.component';

describe('ConfirmDataFormComponent', () => {
  let component: ConfirmDataFormComponent;
  let fixture: ComponentFixture<ConfirmDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDataFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
