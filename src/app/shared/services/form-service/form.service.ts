import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { store } from '../../../store/store/store';
import { updateFormData } from '../../../store/store/actions/form.actions';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private currentStep = new BehaviorSubject<number>(0);
  private formConfig: any;
  public forms: FormGroup[] = [];

  constructor(private formBuilder: FormBuilder) {}

  setFormConfig(config: any) {
    this.formConfig = config;
    this.initializeForms();
  }

  private initializeForms() {
    Object.keys(this.formConfig).forEach((stepKey) => {
      const group: any = {};
      Object.keys(this.formConfig[stepKey]).forEach((controlKey) => {
        const control = this.formConfig[stepKey][controlKey];
        group[controlKey] = [control.value || '', control.validators || []];
      });
      this.forms.push(this.formBuilder.group(group));
    });
  }

  getFieldType(controlName: string) {
    const currentStepKey = Object.keys(this.formConfig)[
      this.currentStep.getValue()
    ];
    const currentStepConfig = this.formConfig[currentStepKey];

    if (currentStepConfig && currentStepConfig[controlName]) {
      return currentStepConfig[controlName].type || 'input';
    }

    return 'input';
  }

  getFormConfigKeysByCurrentStep() {
    const currentStep = this.currentStep.getValue();
    const key = Object.keys(this.formConfig)[currentStep];
    return this.transformStepKeyToTitle(key);
  }

  transformStepKeyToTitle(stepKey: string) {
    return stepKey.replace(/_/g, ' ');
  }

  get formControlNames(): string[] {
    return Object.keys(this.getCurrentStepForm().controls);
  }

  getFormControlLabel(controlName: string): string {
    const currentStepKey = Object.keys(this.formConfig)[
      this.currentStep.getValue()
    ];
    const currentStepConfig = this.formConfig[currentStepKey];

    if (currentStepConfig && currentStepConfig[controlName]) {
      return currentStepConfig[controlName].label || controlName;
    }

    return controlName;
  }

  submitFormData(stepData: any) {
    store.dispatch(updateFormData(stepData));
  }

  getCurrentStepObservable() {
    return this.currentStep.asObservable();
  }

  getCurrentStepForm() {
    return this.forms[this.currentStep.getValue()];
  }

  goToNextStep() {
    if (this.currentStep.getValue() < this.forms.length - 1) {
      this.currentStep.next(this.currentStep.getValue() + 1);
    }
  }

  goToPreviousStep() {
    if (this.currentStep.getValue() > 0) {
      this.currentStep.next(this.currentStep.getValue() - 1);
    }
  }
}
