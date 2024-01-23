import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private readonly INITIAL_STEP = 1;
  private formData$ = new BehaviorSubject<FormGroup>(new FormGroup({}));
  private currentStep$ = new BehaviorSubject<number>(this.INITIAL_STEP);
  private formValidity$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.setupFormValidityListener();
  }

  private setupFormValidityListener() {
    this.formData$.pipe(
      switchMap(form => form.statusChanges),
      map(status => status === 'VALID'),
      distinctUntilChanged()
    ).subscribe(isValid => this.formValidity$.next(isValid));
  }

  public initializeForm(form: FormGroup): void {
    this.formData$.next(form);
  }

  public hasFormControls(formGroup: FormGroup): boolean {
    return formGroup && Object.keys(formGroup.controls).length > 0;
  }

  public addFormControl(formControlName: string, formControl: any): void {
    this.getSharedForm().addControl(formControlName, formControl);
  }

  public removeFormControl(formControlName: string): void {
    this.getSharedForm().removeControl(formControlName);
  }

  public getFormControl(formControlName: string): any {
    return this.getSharedForm().get(formControlName);
  }

  public isFormValid(): boolean {
    return this.getSharedForm().valid;
  }

  public getSharedForm(): FormGroup {
    return this.formData$.value;
  }

  public onFormValidityChange(): Observable<boolean> {
    return this.formValidity$.asObservable();
  }

  public onCurrentStepChange(): Observable<number> {
    return this.currentStep$.asObservable();
  }

  public updateCurrentStep(step: number): void {
    this.validateStep(step);
    this.currentStep$.next(step);
  }

  public resetForm(): void {
    this.formData$.next(new FormGroup({}));
  }

  public resetToInitialStep(): void {
    this.currentStep$.next(this.INITIAL_STEP);
  }

  public resetAll(): void {
    this.resetForm();
    this.resetToInitialStep();
  }

  public advanceStep(): void {
    this.changeStep(1);
  }

  public regressStep(): void {
    this.changeStep(-1);
  }

  public navigateToStep(step: number): void {
    this.validateStep(step);
    this.currentStep$.next(step);
  }

  private changeStep(delta: number): void {
    const currentStep = this.currentStep$.value;
    this.updateCurrentStep(currentStep + delta);
  }

  private validateStep(step: number): void {
    if (step < this.INITIAL_STEP) {
      throw new Error('Invalid step value. Step must be greater than or equal to the initial step.');
    }
  }
}
