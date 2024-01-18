import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf, NgStyle, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { ErrorService } from '../../../shared/services/error-service/error.service';
import { InitialFormStepComponent } from '../initial-form-step/initial-form-step.component';
import { FormConfirmationComponent } from '../form-confirmation/form-confirmation.component';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';

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
export class FormContainerComponent implements OnInit, OnDestroy {
  currentStep: number = 0;
  messages: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    public formStateService: FormStateService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.formStateService.currentStep
      .pipe(takeUntil(this.destroy$))
      .subscribe(step => this.currentStep = step);

    this.subscribeToErrors();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToErrors() {
    this.errorService.errors
      .pipe(takeUntil(this.destroy$))
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

  public handleStepChange(step: number) {
    this.formStateService.setCurrentStep(step);
  }

  public goToNextStep() {
    if (this.formStateService.form.valid) {
      this.formStateService.nextStep();
    }
  }

  public goToPreviousStep() {
    this.formStateService.previousStep();
  }

  public get currentStepTitle(): string |    null {
    const titles: { [key: number]: string } = {
      1: 'Start de dakcheck',
      2: 'Bevestig je adres',
      // Add other titles for additional steps as needed
    };
    return titles[this.currentStep] || null;
  }

}

