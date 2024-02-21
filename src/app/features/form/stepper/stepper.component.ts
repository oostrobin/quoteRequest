import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Stepper vertical
 */
@Component({
  selector: 'stepper-vertical',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class StepperComonentVertical {
  firstFormGroup = this._formBuilder.group({
    fullNameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.email],
    phoneCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    postcodeCtrl: ['', Validators.required],
    huisnummerCtrl: ['', Validators.required],
    toevoegingCtrl: ['', Validators.required],
    straatnaamCtrl: ['', Validators.required],
    woonplaatsCtrl: ['', Validators.required],

  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
