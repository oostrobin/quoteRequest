// Angular Core Imports
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// Angular Common Imports
import { NgIf, NgStyle, NgFor } from '@angular/common';

// RxJS Imports
import { Subject, Subscription, takeUntil } from 'rxjs';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';

// Local Component Imports
import { InitialFormStepComponent } from '../initial-form-step/initial-form-step.component';
import { FormConfirmationComponent } from '../form-confirmation/form-confirmation.component';

// Service Imports
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ErrorService } from '../../../shared/services/error-service/error.service';

// Constants
const INITIAL_STEP: number = 0;

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
  ],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent {
  currentStep: number = INITIAL_STEP;
  isFormValid: boolean = false;
  messages: string[] = [];
  private subscription: Subscription = new Subscription();
  private destroy = new Subject<void>();

  constructor(
    private formStateService: FormStateService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.setupSubscriptions();
  }

  ngOnDestroy() {
    this.teardownSubscriptions();
  }

  private setupSubscriptions() {
    this.subscribeToCurrentStep();
    this.subscribeToErrors();
  }

  private teardownSubscriptions() {
    this.destroy.next();
    this.destroy.complete();
    this.subscription.unsubscribe();
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
    this.subscription.add(
      this.formStateService.currentStep.subscribe({
        next: this.handleStepChange.bind(this),
        error: this.handleError.bind(this),
      })
    );
  }

  private handleStepChange(step: number) {
    this.currentStep = step;
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
  }

  public goToNextStep() {
    if (!this.isFormValid) return;
    this.formStateService.nextStep();
  }

  public goToPreviousStep() {
    this.formStateService.previousStep();
  }
}
