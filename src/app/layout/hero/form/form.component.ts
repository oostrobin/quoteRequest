import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormService } from '../form.service';
import { AddressLookupService } from '../../../shared/services/address-lookup.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatCardModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  addressData: any[] = [];
  address: FormGroup = new FormGroup({
    postalcode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]),
    housenumber: new FormControl('', [Validators.required, Validators.minLength(1)]),
    addition: new FormControl(''),
  });

  constructor(private formService: FormService, private addressLookupService: AddressLookupService) {
    this.address.valueChanges.subscribe(() => {
      this.formService.setFormValidity(this.address.valid);
    });
  }

  ngOnInit() {
    this.addressLookupService.lookupAddress('1782SP', '46').subscribe(data => {
      this.addressData = data;
      console.log(this.addressData);
    });
  }
  
}
