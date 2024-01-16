import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formDataSubject: BehaviorSubject<FormGroup> =
    new BehaviorSubject<FormGroup>(new FormGroup({}));
  initialStep: number = 1;
  private formValiditySubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.formDataSubject.value.valid);
  private currentStepSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(this.initialStep);

  constructor() {
    this.formDataSubject.pipe(
      // Switch to the statusChanges observable of the current form
      switchMap((form) => form.statusChanges.pipe(
        // Start with the current status to ensure an initial emit
        startWith(form.valid)
      ))
    ).subscribe((status) => {
      // Update the validity BehaviorSubject
      this.formValiditySubject.next(status === 'VALID');
    });
    console.log(this.formDataSubject)
  }

  get formValidityChanged() {
    return this.formValiditySubject.asObservable();
  }

  /**
   * Get the observable for the current step.
   * @returns The observable for the current step.
   */
  get currentStep() {
    return this.currentStepSubject.asObservable();
  }

  /**
   * Set the current step.
   * @param step - The current step to set.
   */
  setCurrentStep(step: number) {
    if (step >= this.initialStep) {
      this.currentStepSubject.next(step);
    } else {
      throw new Error(
        'Invalid step value. Step must be greater than or equal to the initial step.'
      );
    }
  }

  /**
   * Set the form data.
   * @param form - The form data to set.
   */
  setFormData(form: FormGroup) {
    if (form instanceof FormGroup) {
      this.formDataSubject.next(form);
    } else {
      throw new Error('Invalid form data. Expected instance of FormGroup.');
    }
  }

  /**
   * Get the observable for the form data.
   * @returns The observable for the form data.
   */
  get formData() {
    return this.formDataSubject.asObservable();
  }

  /**
   * Reset the form data to an empty object.
   */
  resetFormData() {
    this.formDataSubject.next(new FormGroup({}));
  }
  /**
   * Reset the current step to the initial step.
   */
  resetCurrentStep() {
    this.currentStepSubject.next(this.initialStep);
  }

  /**
   * Reset the form data and the current step to their initial values.
   */
  resetAll() {
    this.resetFormData();
    this.resetCurrentStep();
  }

  /**
   * Go to the next step by incrementing the current step value.
   */
  nextStep() {
    const currentStep = this.currentStepSubject.getValue();
    const nextStep = currentStep + 1;
    const maxStep = this.getMaxStep();

    if (nextStep <= maxStep) {
      this.currentStepSubject.next(nextStep);
    }
  }

  /**
   * Go to the previous step by decrementing the current step value.
   */
  previousStep() {
    const currentStep = this.currentStepSubject.getValue();
    const previousStep = currentStep - 1;
    const minStep = this.getMinStep();

    if (previousStep >= minStep) {
      this.currentStepSubject.next(previousStep);
    }
  }

  /**
   * Get the maximum step value.
   * @returns The maximum step value.
   */
  private getMaxStep(): number {
    // Add your logic to determine the maximum step value
    return 10;
  }

  /**
   * Get the minimum step value.
   * @returns The minimum step value.
   */
  private getMinStep(): number {
    // Add your logic to determine the minimum step value
    return 0;
  }

  /**
   * Go to the specified step.
   * @param step - The step to go to.
   */
  goToStep(step: number) {
    if (step >= this.initialStep) {
      this.currentStepSubject.next(step);
    } else {
      throw new Error(
        'Invalid step value. Step must be greater than or equal to the initial step.'
      );
    }
  }
}
