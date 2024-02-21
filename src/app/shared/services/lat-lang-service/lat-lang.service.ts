import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CacheService } from '../cache-service/cache.service';

@Injectable({
  providedIn: 'root',
})
export class LatLangService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getLatLongFromAddress(address: string, city?: string): Observable<any> {
    const query = city ? `${address}, ${city}` : address;
    const cacheKey = encodeURIComponent(query);

    const cachedResponse = this.cacheService.getCache(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse); // Return cached data as an Observable
    }

    return this.makeApiCall(query).pipe(
      map((response) => this.processApiResponse(response, cacheKey))
    );
  }
  private makeApiCall(query: string): Observable<any> {
    const headers = new HttpHeaders().set('User-Agent', 'com.your.app v1.0');
    return this.http.get('https://nominatim.openstreetmap.org/search', {
      headers: headers,
      params: {
        q: query,
        format: 'json',
      },
    });
  }

  private processApiResponse(response: any, cacheKey: string): any {
    this.cacheService.setCache(cacheKey, response);
    return response;
  }
}
