import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FieldConfig } from '../../../layout/full-screen-form-container/steps/config/form.config';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    ReactiveFormsModule,
    NgIf,
    BaseInputComponent,
  ],
})
export class DynamicFieldComponent implements OnInit {
  @Input() field: FieldConfig = { name: '', label: '', type: 'text' };
  @Input() form: FormGroup = new FormGroup({});

  ngOnInit() {
    console.log(this.getControl(this.field.name)  );
  }

  getControl(name: string): FormControl {
    const control = this.form.get(name);
    if (control instanceof FormControl) {
      return control;
    } else {
      throw new Error(`Control ${name} does not exist or is not a FormControl`);
    }
  }
}
