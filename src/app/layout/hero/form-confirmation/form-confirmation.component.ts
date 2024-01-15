import {  FormStateService } from '../../../shared/services/form-state/form-state.service';
import { AddressData } from '../../../shared/services/address-lookup.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { AddressLookupService } from '../../../shared/services/address-lookup.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { Observer } from 'rxjs';
import { NgIf, UpperCasePipe } from '@angular/common';
import { ErrorDisplayComponent } from '../form-error/error-display.component';

@Component({
  selector: 'confirm-data-step',
  standalone: true,
  imports: [MatCheckboxModule, MatIconModule, UpperCasePipe, ErrorDisplayComponent, NgIf],
  templateUrl: './form-confirmation.component.html',
  styleUrl: './form-confirmation.component.scss'
})
export class FormConfirmationComponent {

  
}
