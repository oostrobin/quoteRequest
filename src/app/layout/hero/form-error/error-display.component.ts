import { NgIf } from '@angular/common';
import {  FormStateService } from '../../../shared/services/form-state/form-state.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error-display.component.html',
  styleUrl: './error-display.component.scss'
})
export class ErrorDisplayComponent {

 
} 
