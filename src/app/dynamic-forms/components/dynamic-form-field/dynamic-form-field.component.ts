import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../../layout/full-screen-form-container/steps/config/form.config';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, ReactiveFormsModule, NgIf, BaseInputComponent]
  })
export class DynamicFieldComponent implements OnInit {
  @Input() field: FieldConfig = { name: '', label: '', type: 'text' };
  @Input() form: FormGroup = new FormGroup({});

  ngOnInit() { 
  }
}
