import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { AddressDTO, AddressLookupService } from '../../../shared/services/address-lookup.service';
import { FormStateService } from '../../../shared/services/form-state/form-state.service';
import { Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'confirm-data-step',
  standalone: true,
  imports: [MatCheckboxModule, MatIconModule, UpperCasePipe, NgIf, AsyncPipe],
  templateUrl: './form-confirmation.component.html',
  styleUrl: './form-confirmation.component.scss',
})
export class FormConfirmationComponent implements OnInit, OnDestroy {
  address: AddressDTO = new AddressDTO('', '', '', '');
  private destroy$ = new Subject<void>();

  constructor(
    private addressLookupService: AddressLookupService,
    public formStateService: FormStateService // Made public for template access
  ) { }

  ngOnInit() {
    this.getAddressDetails('1782SP', '46');
    this.addOwnershipControl();
  }

  ngOnDestroy() {
    this.removeOwnershipControl();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private addOwnershipControl() {
    if (!this.formStateService.form.get('ownership')) {
      this.formStateService.form.addControl(
        'ownership',
        Validators.requiredTrue
      );
    }
  }

  private removeOwnershipControl() {
    this.formStateService.form.removeControl('ownership');
  }

  private getAddressDetails(postalCode: string, houseNumber: string) {
    this.addressLookupService.getAddressDetails(postalCode, houseNumber)
      .pipe(takeUntil(this.destroy$))
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
    this.formStateService.previousStep();
  }

  // Add any additional methods required for your component
}
