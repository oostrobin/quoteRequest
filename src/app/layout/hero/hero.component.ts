import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormComponent } from './form/form.component';
import { ConfirmDataFormComponent } from './confirm-data-form/confirm-data-form.component';
import { NgIf } from '@angular/common';
import { FormService } from './form.service';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormComponent, ConfirmDataFormComponent,NgIf],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  isFormValid = false;

  constructor(private formService: FormService) {}

  checkFormValidity() {
    this.isFormValid = this.formService.getFormValidity();
    if (!this.isFormValid) {
      alert('Please fill in all required fields.');
    }
  }
  
}
