import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { AddressDTO, AddressLookupService } from '../../../shared/services/address-lookup.service';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'confirm-data-step',
  standalone: true,
  imports: [MatCheckboxModule, MatIconModule, UpperCasePipe, NgIf, AsyncPipe],
  templateUrl: './form-confirmation.component.html',
  styleUrl: './form-confirmation.component.scss',
})
export class FormConfirmationComponent implements OnInit {
  address: AddressDTO = new AddressDTO('', '', '', '');

  constructor(
    private addressLookupService: AddressLookupService,
    private formStateService: FormStateService
  ) {}

   ngOnInit() {
    this.getAddressDetails('1782SP', '46'); // Use appropriate postal code and house number
  }

private getAddressDetails(postalCode: string, houseNumber: string) {
  this.addressLookupService.getAddressDetails(postalCode, houseNumber)
    .subscribe({
      next: (addressDTO: AddressDTO) => {
        this.address = addressDTO;
      },
      error: (error: any) => {
        console.error('Error fetching address:', error);
      }
    });
}
}
