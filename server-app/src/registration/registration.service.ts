import { Injectable } from '@nestjs/common';
import { delay, of } from 'rxjs';
import { fields } from './data/registration-fields';
import { RegistrationRequest } from './models/registration-request';

@Injectable()
export class RegistrationService {
  getRegistrationFields(onlyRequired: boolean) {
    if (onlyRequired) {
      return fields.filter((field) => field.required);
    }

    return fields;
  }

  register(request: RegistrationRequest) {
    return of(request.first_name).pipe(delay(2500));
  }
}
