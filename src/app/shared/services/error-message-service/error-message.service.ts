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
  private fieldLabels: { [key: string]: string } = {
    username: 'Username',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Phone Number',
    houseNumber: 'House Number',
    address: 'Address',
    city: 'City',
    state: 'State',
    postalCode: 'postal code',
    country: 'Country',
    birthdate: 'Birthdate',
    gender: 'Gender',
    terms: 'Terms and Conditions',
    privacyPolicy: 'Privacy Policy',
    companyName: 'Company Name',
    website: 'Website URL',
    bio: 'Biography',
    profilePicture: 'Profile Picture',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
  };

  constructor(private http: HttpClient) {
    this.loadErrorMessages();
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
    console.log(errorKey, field, locale, params);
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
    return Object.keys(params).reduce((message, key) => {
      return message.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
    }, template);
  }
}
