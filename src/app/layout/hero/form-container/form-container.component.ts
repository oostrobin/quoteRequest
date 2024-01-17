// Angular Core Imports
import {  ChangeDetectionStrategy, Component } from '@angular/core';

// Angular Common Imports
import { NgIf, NgStyle, NgFor, NgClass, AsyncPipe } from '@angular/common';

// RxJS Imports
import { Subject, takeUntil } from 'rxjs';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';

// Local Component Imports
import { InitialFormStepComponent } from '../initial-form-step/initial-form-step.component';
import { FormConfirmationComponent } from '../form-confirmation/form-confirmation.component';

// Service Imports
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ErrorService } from '../../../shared/services/error-service/error.service';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [
    InitialFormStepComponent,
    FormConfirmationComponent,
    NgIf,
    NgStyle,
    MatButtonModule,
    ValidationErrorComponent,
    NgFor,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent {
  currentStep: number = 0;
  messages: string[] = [];

  private destroy = new Subject<void>();

  constructor(
    private formStateService: FormStateService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.subscribeToCurrentStep();
    this.subscribeToFormValidity();
    this.subscribeToErrors();
    
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private subscribeToFormValidity() {
    this.formStateService.formValidityChanged
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => (this.isButtonDisabled()),
        error: (error) => this.handleError(error)
      });
  }

  isButtonDisabled() {
    return this.formStateService.isFormCurrentlyValid();
  }

  private subscribeToErrors() {
    this.errorService.errors
      .pipe(takeUntil(this.destroy))
      .subscribe((errorMap) => this.processErrorMap(errorMap));
  }

  private processErrorMap(errorMap: Map<string, string[]>) {
    this.messages = this.translateErrors(errorMap);
  }

  private translateErrors(errorMap: Map<string, string[]>): string[] {
    let messages: string[] = [];
    errorMap.forEach((errors, field) => {
      errors.forEach((errorKey) => {
        const message = this.translateErrorKey(errorKey, field);
        messages.push(message);
      });
    });
    return messages;
  }

  private translateErrorKey(errorKey: string, field: string): string {
    const errorMessages: { [key: string]: string } = {
      required: `${field} is required`,
      maxlength: `${field} is too long`,
      minlength: `${field} is too short`,
      pattern: `${field} is invalid`,
    };
    return errorMessages[errorKey];
  }

  private subscribeToCurrentStep() {
    this.formStateService.currentStep
      .pipe(takeUntil(this.destroy))
      .subscribe((step) => (this.currentStep = step));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
  }

  public handleStepChange(step: number) {
    this.formStateService.setCurrentStep(step);
  }

  public goToNextStep() {
    
    this.formStateService.nextStep();
  }

  public goToPreviousStep() {
    this.formStateService.previousStep();
  }

  public get currentStepTitle(): string | null {
    const titles: { [key: number]: string } = {
      1: 'Start de dakcheck',
      2: 'Bevestig je adres',
    };
    return titles[this.currentStep] || null;
  }
}
