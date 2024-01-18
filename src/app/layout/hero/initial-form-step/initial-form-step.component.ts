import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { ErrorService } from '../../../shared/services/error-service/error.service';
import { Subject, takeUntil } from 'rxjs';
import { FORM_CONFIG } from './config/form-config.constant';

@Component({
  selector: 'form-step-one',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './initial-form-step.component.html',
  styleUrl: './initial-form-step.component.scss',
})
export class InitialFormStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private formStateService: FormStateService
  ) {}

  ngOnInit() {
    this.initializeOrGetExistingForm();
    this.subscribeToFormChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get addressForm(): FormGroup {
    return this.formStateService.form;
  }
  
  private initializeOrGetExistingForm() {
    if (!this.addressForm.controls.ownership) {
      // Assuming 'ownership' is a field in your form
      const newForm = this.buildForm();
      this.formStateService.setFormData(newForm);
    }
  }

  private buildForm(): FormGroup {
    const formGroupConfig = FORM_CONFIG.reduce((config, field) => {
      config[field.key] = [field.initialValue, field.validators];
      return config;
    }, {});

    return this.formBuilder.group(formGroupConfig);
  }

  private subscribeToFormChanges() {
    this.addressForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.handleFormStatusChange());
  }

  private handleFormStatusChange() {
    for (const controlName in this.addressForm.controls) {
      const control = this.addressForm.get(controlName);
      if (control && !control.valid) {
        this.updateErrorService();
      } else {
        this.errorService.removeErrorForField(controlName);
      }
    }
  }

  private updateErrorService() {
    for (const controlName in this.addressForm.controls) {
      this.processControlErrors(controlName);
    }
  }

  private processControlErrors(controlName: string) {
    const control = this.addressForm.get(controlName);
    if (control && this.shouldReportErrors(control)) {
      const errors = Object.keys(control.errors || {});
      this.errorService.addErrorsForField(controlName, errors);
    } else {
      this.errorService.removeErrorForField(controlName);
    }
  }

  private shouldReportErrors(control: FormGroup): boolean {
    return control && control.errors && (control.dirty || control.touched);
  }
}
