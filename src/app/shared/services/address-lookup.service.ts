import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddressLookupService {
  private readonly OSM_API_URL = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  lookupAddress(postalCode: string, houseNumber: string) {
    const addressQuery = `${postalCode} ${houseNumber}, Netherlands`;
    const url = `${this.OSM_API_URL}?format=jsonv2&q=${encodeURIComponent(addressQuery)}`;

    return this.http.get<any[]>(url);
  }
}
