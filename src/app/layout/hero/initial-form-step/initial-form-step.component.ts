import { ErrorService } from './../../../shared/services/error-service/error.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'form-step-one',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './initial-form-step.component.html',
  styleUrl: './initial-form-step.component.scss',
})
export class InitialFormStepComponent {
  addressForm: FormGroup = new FormGroup({});
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private formStateService: FormStateService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.subscribeToFormChanges();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
   private initializeForm() {
    const existingForm = this.getExistingForm();
    if (existingForm) {
      this.addressForm = existingForm;
    } else {
      this.createAndSetNewForm();
    }
  }


  private getExistingForm(): FormGroup | null {
    const existingForm = this.formStateService.sharedFormGroup;
    return existingForm && this.hasControls(existingForm) ? existingForm : null;
  }

  private createAndSetNewForm() {
    const newForm = this.buildForm();
    this.formStateService.setFormData(newForm);
    this.formStateService.initializeFormGroup(newForm);
    this.addressForm = newForm;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      postalCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]{4}[A-Za-z]{2}$')]],
      houseNumber: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]*$')]],
      addition: ['']
    });
  }
  
  private hasControls(formGroup: FormGroup): boolean {
    return formGroup && this.formStateService.hasControls(formGroup);
  }

   private subscribeToFormChanges() {
    this.addressForm.statusChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.handleFormStatusChange());
  }

  private handleFormStatusChange() {
    Object.keys(this.addressForm.controls).forEach((controlName) => {
      const control = this.addressForm.get(controlName);
      if (control && !control.valid) {
        this.updateErrorService();
      } else {
        this.errorService.removeErrorForField(controlName);
      }
    });
  }

  private updateErrorService() {
    Object.keys(this.addressForm.controls).forEach((controlName) => {
      const control = this.addressForm.get(controlName);
      if (control && control.errors && (control.dirty || control.touched)) {
        const errors = control.errors ? Object.keys(control.errors) : [];
        this.errorService.addErrorsForField(controlName, errors);
      } else {
        this.errorService.removeErrorForField(controlName);
      }
    });
  }
}
