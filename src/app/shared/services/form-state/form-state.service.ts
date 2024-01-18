import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { ErrorService } from '../../../shared/services/error-service/error.service';
import { Subject, takeUntil } from 'rxjs';
import { FORM_CONFIG } from './config/form-config.constant';

@Component({
  selector: 'form-step-one',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './initial-form-step.component.html',
  styleUrl: './initial-form-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialFormStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private formStateService: FormStateService
  ) {}

  ngOnInit() {
    this.addControlsToForm();
    this.subscribeToFormChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private addControlsToForm() {
    const formGroupConfig = FORM_CONFIG.reduce((config, field) => {
      if (!this.formStateService.form.get(field.key)) {
        config[field.key] = [field.initialValue, field.validators];
      }
      return config;
    }, {});

    this.formStateService.form.addControl(this.formBuilder.group(formGroupConfig));
  }

  private subscribeToFormChanges() {
    this.formStateService.form.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.handleFormStatusChange());
  }

  private handleFormStatusChange() {
    // Error handling logic
  }

  // Include the rest of your error handling logic as before
}
