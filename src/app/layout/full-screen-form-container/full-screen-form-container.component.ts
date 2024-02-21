import { FORM_CONFIG } from './steps/config/form.config';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StepComponent } from './steps/step.component';
import { NgFor, NgIf } from '@angular/common';
import { DynamicFormComponent } from '../../dynamic-forms/components/dynamic-form/dynamic-form.component';
import { FormService } from '../../shared/services/form-service/form.service';

@Component({
  selector: 'full-screen-form-container',
  standalone: true,
  imports: [MatIconModule, StepComponent, NgFor, NgIf, DynamicFormComponent],
  templateUrl: './full-screen-form-container.component.html',
  styleUrl: './full-screen-form-container.component.scss',
})
export class FullScreenFormContainerComponent {
  config = FORM_CONFIG;

  constructor(private formService: FormService) {}

  handleNextClick() {
    this.formService.goToNextStep();
  }

  handlePreviousClick() {
    this.formService.goToPreviousStep();
  }
}
