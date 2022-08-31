import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegistrationField } from './models/registration-field';
import { RegistrationService } from './registration.service';

@Injectable()
export class RegistrationResolver implements Resolve<RegistrationField[]> {
  constructor(private registrationService: RegistrationService) {}

  resolve(): Observable<RegistrationField[]> {
    return this.registrationService.getFormFields();
  }
}
