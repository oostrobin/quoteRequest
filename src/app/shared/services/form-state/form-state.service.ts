import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for managing the state of a form.
 */
/**
 * Service for managing the state of a form.
 */
@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formDataSubject: BehaviorSubject<FormGroup> =
    new BehaviorSubject<FormGroup>({} as FormGroup);
  private formValiditySubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private currentStepSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(1);
  private readonly initialStep: number = 0;

  constructor() {}

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
    this.currentStepSubject.next(step);
  }

  /**
   * Set the form data.
   * @param form - The form data to set.
   */
  setFormData(form: FormGroup) {
    this.formDataSubject.next(form);
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
    this.formDataSubject.next({} as FormGroup);
  }

  /**
   * Update the validity of the form.
   * @param isValid - The validity of the form.
   */
  updateFormValidity(isValid: boolean) {
    this.formValiditySubject.next(isValid);
  }

  /**
   * Get the observable for the current form validity.
   * @returns The observable for the current form validity.
   */
  get currentFormValidity(): Observable<boolean> {
    return this.formValiditySubject.asObservable();
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
    this.currentStepSubject.next(this.currentStepSubject.getValue() + 1);
  }

  /**
   * Go to the previous step by decrementing the current step value.
   */
  previousStep() {
    this.currentStepSubject.next(this.currentStepSubject.getValue() - 1);
  }

  /**
   * Go to the specified step.
   * @param step - The step to go to.
   */
  goToStep(step: number) {
    this.currentStepSubject.next(step);
  }
}
