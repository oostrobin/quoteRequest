import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import {
  AddressDTO,
  AddressLookupService,
} from '../../../shared/services/address-lookup.service';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'confirm-data-step',
  standalone: true,
  imports: [MatCheckboxModule, MatIconModule, UpperCasePipe, NgIf, AsyncPipe],
  templateUrl: './form-confirmation.component.html',
  styleUrl: './form-confirmation.component.scss',
})
export class FormConfirmationComponent implements OnInit {
  isFormValid: boolean = false;
  address: AddressDTO = new AddressDTO('', '', '', '');
  destroy = new Subject<void>();

  constructor(
    private addressLookupService: AddressLookupService,
    private formStateService: FormStateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getAddressDetails('1782SP', '46');
    this.addOwnershipControl();
  }
  

  private addOwnershipControl() {
    const ownershipControl = this.formBuilder.control(
      false,
      Validators.requiredTrue
    );
    this.formStateService.sharedFormGroup.addControl(
      'ownership',
      ownershipControl
    );
  }

    private removeOwnershipControl() {
      this.formStateService.sharedFormGroup.removeControl('ownership');
    }

    private getAddressDetails(postalCode: string, houseNumber: string) {
    this.addressLookupService
      .getAddressDetails(postalCode, houseNumber)
      .subscribe({
        next: (addressDTO: AddressDTO) => {
          this.address = addressDTO;
        },
        error: (error: any) => {
          console.error('Error fetching address:', error);
        },
      });
  }

  public goToPreviousStep() {
    this.removeOwnershipControl();
    this.formStateService.previousStep();
  }
}
