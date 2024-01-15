// Angular Core Imports
import { ChangeDetectionStrategy, Component } from '@angular/core';

// Angular Common Imports
import { NgIf, NgStyle } from '@angular/common';

// RxJS Imports
import { Subscription } from 'rxjs';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';

// Local Component Imports
import { InitialFormStepComponent } from '../initial-form-step/initial-form-step.component';
import { FormConfirmationComponent } from '../form-confirmation/form-confirmation.component';

// Service Imports
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

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
    ValidationErrorComponent
  ],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent {
  currentStep: number = INITIAL_STEP;
  isFormValid: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private formStateService: FormStateService) {}

  ngOnInit() {
    this.subscribeToCurrentStep();
    this.subscribeToFormValidity();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private subscribeToCurrentStep() {
    this.subscription.add(
      this.formStateService.currentStep.subscribe({
        next: this.handleStepChange.bind(this),
        error: this.handleError.bind(this)
      })
    );
  }

  private subscribeToFormValidity() {
    this.subscription.add(
      this.formStateService.currentFormValidity.subscribe({
        next: this.handleFormValidityChange.bind(this),
        error: this.handleError.bind(this)
      })
    );
  }

  private handleStepChange(step: number) {
    this.currentStep = step;
  }

  private handleFormValidityChange(valid: boolean) {
    this.isFormValid = valid;
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
