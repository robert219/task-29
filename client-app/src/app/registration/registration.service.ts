import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationField } from './models/registration-field';
import { RegistrationRequest } from './models/registration-request';

@Injectable()
export class RegistrationService {
  private readonly url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public getFormFields(): Observable<RegistrationField[]> {
    return this.httpClient.get<RegistrationField[]>(
      `${this.url}/registration/fields`,
      {
        // params: { onlyRequired: true },
      }
    );
  }

  public register(registrationRequest: RegistrationRequest) {
    return this.httpClient.post(
      `${this.url}/registration`,
      registrationRequest
    );
  }
}
