import { ErrorService } from './../../../shared/services/error-service/error.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { Subject, takeUntil } from 'rxjs';
import { FORM_CONFIG, FormConfig } from './config/form-config.constant';

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
export class InitialFormStepComponent implements OnInit, OnDestroy {
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
    const formGroupConfig: {[key in keyof FormConfig]?: any} = {};

    for (const key in FORM_CONFIG) {
      if (FORM_CONFIG.hasOwnProperty(key)) {
        const controlConfig = FORM_CONFIG[key as keyof typeof FORM_CONFIG]; 
        formGroupConfig[key] = [
          controlConfig.initialValue,
          controlConfig.validators
        ];
      }
    }

    return this.formBuilder.group(formGroupConfig);
  }
  

  private hasControls(formGroup: FormGroup): boolean {
    return formGroup && this.formStateService.hasControls(formGroup);
  }

  private subscribeToFormChanges() {
    this.addressForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.handleFormStatusChange());
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
      this.processControlErrors(controlName);
    });
  }

  private processControlErrors(controlName: string) {
    const control = this.addressForm.get(controlName);
    if (control !== null && this.shouldReportErrors(control)) {
      const errors = Object.keys(control.errors || {});
      this.errorService.addErrorsForField(controlName, errors);
    } else {
      this.errorService.removeErrorForField(controlName);
    }
  }

  private shouldReportErrors(control: AbstractControl | null): boolean {
    return (
      control !== null &&
      control.errors !== null &&
      (control.dirty || control.touched)
    );
  }
}
