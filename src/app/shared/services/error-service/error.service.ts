import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<Map<string, string[]>>(new Map());

  constructor() { }

  get errors() {
    return this.errorSubject.asObservable();
  }

  addErrorsForField(field: string, errors: string[]) {
    const errorMap = new Map(this.errorSubject.value);
    errorMap.set(field, errors);
    this.errorSubject.next(errorMap);
  }

  getErrorsForField(field: string) {
    return this.errorSubject.value.get(field) || [];
  }

  removeErrorForField(field: string) {
    const errorMap = new Map(this.errorSubject.value);
    errorMap.delete(field);
    this.errorSubject.next(errorMap);
  }

  resetErrors() {
    this.errorSubject.next(new Map());
  }

  hasErrors() {
    return this.errorSubject.value.size > 0;
  }

  hasErrorsForField(field: string) {
    return (this.errorSubject.value.get(field) || []).length > 0;
  }
}
