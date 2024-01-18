import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { AddressDTO, AddressLookupService } from '../../../shared/services/address-lookup.service';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'confirm-data-step',
  standalone: true,
  imports: [MatCheckboxModule, MatIconModule, UpperCasePipe, NgIf, AsyncPipe, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './form-confirmation.component.html',
  styleUrl: './form-confirmation.component.scss',
})
export class FormConfirmationComponent implements OnInit {
  private readonly OWNERSHIP_CONTROL_NAME = 'ownership';
  address: AddressDTO | null = null;
  formGroup = this.formStateService.getSharedForm();


  constructor(
    private addressLookupService: AddressLookupService,
    private formStateService: FormStateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeAddressDetails();
    this.addOwnershipControlToForm();
   
  }

  private initializeAddressDetails() {
    const postalCode = this.formGroup.get('postalCode')?.value;
    const houseNumber = this.formGroup.get('houseNumber')?.value;
    this.fetchAddressDetails(postalCode, houseNumber);
  }

  private fetchAddressDetails(postalCode: string, houseNumber: string) {
    this.addressLookupService.getAddressDetails(postalCode, houseNumber).subscribe({
      next: (address: AddressDTO) => {
        this.address = address;
      },
      error: (error: any) => {
        console.error('Error fetching address:', error);
      },
    });
  }

  private addOwnershipControlToForm() {
    const ownershipControl = this.formBuilder.control(false, this.checkboxRequired);
    this.formGroup.addControl(this.OWNERSHIP_CONTROL_NAME, ownershipControl);
  }

  private checkboxRequired(control: AbstractControl): ValidationErrors | null {
  return control.value ? null : { required: true };
}

  private removeOwnershipControlFromForm() {
    this.formStateService.getSharedForm().removeControl(this.OWNERSHIP_CONTROL_NAME);
  }

  public onPreviousStep() {
    this.removeOwnershipControlFromForm();
    this.formStateService.regressStep();
  }
}
