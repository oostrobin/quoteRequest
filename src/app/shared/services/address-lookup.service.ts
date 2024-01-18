import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';

export class AddressDTO {
  constructor(
    public city: string,
    public street: string,
    public postalCode: string,
    public houseNumber: string
  ) {}
}

interface AddressResponse {
  city: string;
  street: string;
}

@Injectable({
  providedIn: 'root',
})
export class AddressLookupService {
  private readonly POSTCODE_API_URL = `https://postcode.tech/api/v1/postcode`;
  private readonly POSTCODE_API_KEY = 'a1193ebb-0f32-43c5-ad57-c2edf26d5d75';
  private cache: { [key: string]: ReplaySubject<AddressDTO> } = {};

  constructor(private http: HttpClient) {}

  getAddressDetails(postalCode: string, houseNumber: string): Observable<AddressDTO> {
      const cacheKey = `${postalCode}_${houseNumber}`;

      if (!this.cache[cacheKey]) {
        this.cache[cacheKey] = new ReplaySubject<AddressDTO>(1);
        const url = `${this.POSTCODE_API_URL}?postcode=${postalCode}&number=${houseNumber}`;

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.POSTCODE_API_KEY}`,
        });

        this.http.get<AddressResponse>(url, { headers }).pipe(
          map((response) => {
            if (!response.city || !response.street) {
              throw new Error('Invalid response structure');
            }
            return new AddressDTO(response.city, response.street, postalCode, houseNumber);
          }),
          catchError((error) => {
            console.error('Error fetching address:', error);
            return throwError(() => new Error(error));
          })
        ).subscribe({
          next: (result) => {
            this.cache[cacheKey].next(result);
          },
          error: (error) => {
            this.cache[cacheKey].error(error);
            delete this.cache[cacheKey];
          }
        });
      }

      return this.cache[cacheKey].asObservable();
    }

     clearCache(postalCode: string, houseNumber: string): void {
      const cacheKey = `${postalCode}_${houseNumber}`;
      if (this.cache[cacheKey]) {
        this.cache[cacheKey].complete();
        delete this.cache[cacheKey];
      }
    }
}
