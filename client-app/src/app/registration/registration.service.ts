import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegistrationField } from './models/registration-field';

@Injectable()
export class RegistrationService {
  private readonly url = 'http://localhost:3000';

  constructor() {}

  public getFormFields(): Observable<RegistrationField[]> {
    return of([
      {
        type: 'text',
        name: 'first_name',
        label: 'First Name',
        required: true,
        validations: [
          {
            name: 'regex',
            message: 'Only English characters are allowed.',
            value: '^[a-zA-Z0-9]*$',
          },
          {
            name: 'maxlength',
            message: 'Must be less than 64 characters.',
            value: 63,
          },
        ],
      },
      {
        type: 'text',
        name: 'middle_name',
        label: 'Middle Name',
        required: false,
        validations: [
          {
            name: 'regex',
            message: 'Only English characters are allowed.',
            value: '^[a-zA-Z0-9]*$',
          },
          {
            name: 'maxlength',
            message: 'Must be less than 64 characters.',
            value: 63,
          },
        ],
      },
      {
        type: 'text',
        name: 'last_name',
        label: 'Last Name',
        required: true,
        validations: [
          {
            name: 'regex',
            message: 'Only English characters are allowed.',
            value: '^[a-zA-Z0-9]*$',
          },
          {
            name: 'maxlength',
            message: 'Must be less than 64 characters.',
            value: 63,
          },
        ],
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
        required: true,
        validations: [
          {
            name: 'regex',
            message: 'Only English characters are allowed.',
            value: '^[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,}$',
          },
          {
            name: 'maxlength',
            message: 'Must be less than 47 characters.',
            value: 46,
          },
        ],
      },
      {
        type: 'phone',
        name: 'phone_number',
        label: 'Mobile number',
        required: true,
        validations: [
          {
            name: 'regex',
            message: 'Only numbers are allowed.',
            value: '^[0-9]+$',
          },
          {
            name: 'maxlength',
            message: 'Must be less than 11 characters.',
            value: 10,
          },
          {
            name: 'minlength',
            message: 'Must not be less than 4 characters.',
            value: 4,
          },
        ],
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password',
        required: true,
        validations: [
          {
            name: 'maxlength',
            message: 'Must be less than 16 characters.',
            value: 15,
          },
          {
            name: 'minlength',
            message: 'Must not be less than 8 characters.',
            value: 8,
          },
          {
            name: 'regex',
            message: '1 or more numbers.',
            value: '^.*[0-9].*$',
          },
          {
            name: 'regex',
            message: '1 or more lower case letters.',
            value: '^.*[a-z].*$',
          },
          {
            name: 'regex',
            message: '1 or more upper case letters.',
            value: '^.*[A-Z].*$',
          },
        ],
      },
    ]);
  }
}
