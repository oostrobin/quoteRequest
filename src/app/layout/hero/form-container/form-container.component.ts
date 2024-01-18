import { ErrorMessageService } from './../../../shared/services/error-message-service/error-message.service';
import {  Component } from '@angular/core';
import { NgIf, NgStyle, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { ErrorService } from '../../../shared/services/error-service/error.service';
import { InitialFormStepComponent } from '../initial-form-step/initial-form-step.component';
import { FormConfirmationComponent } from '../form-confirmation/form-confirmation.component';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [
    InitialFormStepComponent,
    FormConfirmationComponent,
    ValidationErrorComponent,
    NgIf,
    NgStyle,
    NgFor,
    NgClass,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent {
  currentStep: number = 0;
  messages: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private formStateService: FormStateService,
    private errorService: ErrorService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit() {
    this.subscribeToFormState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToFormState() {
    this.formStateService
      .onCurrentStepChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((step) => (this.currentStep = step));

    this.formStateService
      .onFormValidityChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isValid) => this.handleFormValidityChange(isValid));

    this.errorService.errors
      .pipe(takeUntil(this.destroy$))
      .subscribe((errorMap) => this.handleErrors(errorMap));
  }

  private handleFormValidityChange(isValid: boolean) {
   return
  }

 private handleErrors(errorMap: Map<string, string[]>): void {
  const locale = this.errorMessageService.getCurrentLocale(); 
  this.messages = [...errorMap.entries()].flatMap(([field, errors]) => {
    const control = this.formStateService.getSharedForm().get(field); // Assuming 'myForm' is your FormGroup
    return errors.map(errorKey => {
      const errorParams = this.getErrorParams(control, errorKey);
      return this.errorMessageService.getErrorMessage(errorKey, field, locale, errorParams);
    });
  });
}

private getErrorParams(control: AbstractControl | null, errorKey: string): any {
  if (!control || !control.errors || !control.errors[errorKey]) {
    return {};
  }
  const error = control.errors[errorKey];
  // Depending on the validator, the structure of 'error' can vary. 
  // For example, for maxlength, it's { requiredLength: ..., actualLength: ... }
  return {
    length: error.requiredLength || error.actualLength, // For maxlength and minlength
    // ... handle other specific parameters for different validators
  };
}

  public handleStepChange(step: number) {
    this.formStateService.navigateToStep(step);
  }

  public goToNextStep() {
    this.formStateService.advanceStep();
  }

  public goToPreviousStep() {
    this.formStateService.regressStep();
  }

  public get currentStepTitle(): string {
    const titles: { [key: number]: string } = {
      1: 'Start de dakcheck',
      2: 'Bevestig je adres',
    };
    return titles[this.currentStep] || 'Unknown Step';
  }

  get showErrors(): boolean {
    return !this.isButtonDisabled();
  }

  public isButtonDisabled(): boolean {
  return !this.formStateService.isFormValid() || this.messages.length > 0;
}

  getButtonStyles(): any {
    return { justifyContent: this.currentStep === 1 ? 'flex-end' : '' };
  }
}
