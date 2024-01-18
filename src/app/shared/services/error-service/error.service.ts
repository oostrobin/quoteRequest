import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<Map<string, string[]>>(new Map());

  constructor() { }

  private updateErrorMap(updateFunc: (errorMap: Map<string, string[]>) => void): void {
    const errorMap = new Map(this.errorSubject.value);
    updateFunc(errorMap);
    this.errorSubject.next(errorMap);
  }

  get errors() {
    return this.errorSubject.asObservable();
  }

  addError(field: string, errors: string[]): void {
    this.updateErrorMap(errorMap => errorMap.set(field, errors));
  }

  getErrors(field: string): string[] {
    return this.errorSubject.value.get(field) || [];
  }

  removeError(field: string): void {
    this.updateErrorMap(errorMap => errorMap.delete(field));
  }

  resetErrors(): void {
    this.errorSubject.next(new Map());
  }

  hasErrors(): boolean {
    return this.errorSubject.value.size > 0;
  }

  hasFieldErrors(field: string): boolean {
    return (this.errorSubject.value.get(field) || []).length > 0;
  }
}
