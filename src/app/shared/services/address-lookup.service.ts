import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface AddressData {
  street: string;
  city: string;
}

@Injectable({
  providedIn: 'root',
})
export class AddressLookupService {
  private readonly POSTCODE_API_URL = `https://postcode.tech/api/v1/postcode`;
  private readonly POSTCODE_API_KEY = 'a1193ebb-0f32-43c5-ad57-c2edf26d5d75';

  constructor(private http: HttpClient) {}

  getAddressDetails(postalCode: string, houseNumber: string) {
    const addressQuery = `postcode=${postalCode}&number=${houseNumber}`;
    const url = `${this.POSTCODE_API_URL}?${addressQuery}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.POSTCODE_API_KEY}`,
    });

    return this.http.get<AddressData>(url, { headers });
  }
}
