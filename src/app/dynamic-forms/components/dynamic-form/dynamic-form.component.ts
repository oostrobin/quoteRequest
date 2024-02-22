import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { FormConfig } from '../../../layout/full-screen-form-container/steps/config/form.config';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormMapperService } from '../../services/form-mapper.service';
import { DynamicFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgIf,
    DynamicFieldComponent,
  ],
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormConfig = [];
  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private mapper: FormMapperService) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const formGroupConfig: {
      [key: string]: FormGroup | FormControl | FormArray;
    } = {};
    this.config.forEach((step) => {
      step.fields.forEach((field) => {
        formGroupConfig[field.name] = this.mapper.mapFieldToControl(field);
      });
    });

    this.form = this.fb.group(formGroupConfig);
  }
}
