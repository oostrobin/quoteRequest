import { FormConfig } from './../../models/form-config/form-config.interface';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../shared/services/form-service/form.service';
import { NgFor, NgIf } from '@angular/common';
import { BaseInputComponent } from '../base-input/base-input.component';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';

@Component({
  selector: 'dynamic-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    BaseInputComponent,
    ReactiveFormsModule,
    DynamicFormFieldComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input() config: FormConfig = {};
  formGroups: FormGroup[] = [];
  currentStepIndex: number = 0;
  postalCodeSubscription: any;

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.setFormConfig(this.config);
    this.setFormGroups();
    this.subscribeToCurrentStep();  
  }


  subscribeToCurrentStep() {
    this.formService.getCurrentStepObservable().subscribe((index) => {
      this.currentStepIndex = index;
    });
  }

  setFormGroups() {
    this.formGroups = this.formService.forms;
  }

  setFormConfig(config: FormConfig) {
    this.formService.setFormConfig(config);
  }
}
