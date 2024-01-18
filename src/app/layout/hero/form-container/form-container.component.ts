import {  Component } from '@angular/core';
import { NgIf, NgStyle, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { ErrorService } from '../../../shared/services/error-service/error.service';
import { InitialFormStepComponent } from '../initial-form-step/initial-form-step.component';
import { FormConfirmationComponent } from '../form-confirmation/form-confirmation.component';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

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
    private errorService: ErrorService
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
    // Implement functionality for when form validity changes
  }

  private handleErrors(errorMap: Map<string, string[]>) {
    this.messages = [...errorMap.entries()].flatMap(([field, errors]) =>
      errors.map((errorKey) => this.getErrorTranslation(errorKey, field))
    );
  }

  private getErrorTranslation(errorKey: string, field: string): string {
    const translations: { [key: string]: string } = {
      required: `${field} is required`,
      maxlength: `${field} is too long`,
      minlength: `${field} is too short`,
      pattern: `${field} is invalid`,
    };
    return translations[errorKey] || `Unknown error on ${field}`;
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
