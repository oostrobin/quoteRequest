import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface ErrorMessages {
  [locale: string]: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private errorMessages: any;
  private fieldLabels: { [key: string]: string } = {};
  

  constructor(private http: HttpClient) {
    this.loadErrorMessages();
    this.loadFieldLabels();
  }

   private loadFieldLabels(): void {
    const currentLocale = this.getCurrentLocale(); // Implement this method to get current locale
    const filePath = `/assets/i18n/fields/${currentLocale}.json`;

    this.http.get<{ [key: string]: string }>(filePath).pipe(
      catchError(() => {
        console.error('Failed to load field labels. Falling back to default.');
        return of({}); // Fallback to an empty object in case of an error
      })
    ).subscribe(labels => this.fieldLabels = labels);
  }

  public getFieldLabel(field: string): string {
    return this.fieldLabels[field] || field; // Fallback to field name if label is not found
  }

  private loadErrorMessages(): void {
    const currentLocale = this.getCurrentLocale(); // Implement this method
    const filePath = `../../../../assets/i18n/${currentLocale}/${currentLocale}.json`;

    this.http
      .get<ErrorMessages>(filePath)
      .pipe(
        catchError((error) => {
          console.error(
           error
          );
          return of({}); // Fallback to an empty object in case of an error
        })
      )
      .subscribe((messages) => (this.errorMessages = messages));
  }

  public getCurrentLocale(): string {
    return 'nl'; // Implement this method
}

  // Public method to get an error message
  public getErrorMessage(
    errorKey: string,
    field: string,
    locale: string,
    params: any = {}
  ): string {
    const userFriendlyField = this.getUserFriendlyFieldName(field);
    const messageTemplate =
      this.errorMessages[locale]?.[errorKey] ||
      `Unknown error on ${userFriendlyField}`;
    return this.formatMessage(messageTemplate, {
      field: userFriendlyField,
      ...params,
    });
  }

  // Convert technical field name to user-friendly name
  private getUserFriendlyFieldName(field: string): string {
    return this.fieldLabels[field] || field;
  }

  // Format the message with given parameters
 private formatMessage(template: string, params: any): string {
  return Object.keys(params).reduce((currentTemplate, paramKey) => {
    return currentTemplate.replace(new RegExp(`{{${paramKey}}}`, 'g'), params[paramKey]);
  }, template);
}
}
