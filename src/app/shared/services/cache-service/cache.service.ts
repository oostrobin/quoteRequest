import { Injectable } from '@angular/core';

interface CacheContent {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: CacheContent = {};

  constructor() { }

  getCache(key: string): any {
    return this.cache[key];
  }

  setCache(key: string, value: any): void {
    this.cache[key] = value;
  }
}
