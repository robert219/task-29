import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, take, tap } from 'rxjs';
import { RegistrationField } from './models/registration-field';
import { Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public formFields$: Observable<RegistrationField[]>;
  public form?: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private matSnackBar: MatSnackBar
  ) {
    this.formFields$ = this.route.data.pipe(
      map(({ formFields }) => formFields)
    );

    this.formFields$.pipe(take(1)).subscribe((formFields) => {
      const formGroup = this.formBuilder.group({});

      formFields.forEach((formField) => {
        formGroup.addControl(
          formField.name,
          this.formBuilder.control('', {
            validators: this.getFormFieldValidators(formField),
          })
        );
      });

      this.form = formGroup;
    });
  }

  public register() {
    if (this.form?.valid) {
      this.form?.disable();

      const formValue = this.form?.value;

      this.registrationService
        .register(formValue)
        .pipe(
          take(1),
          catchError(({ error }) => this.handleRegisterError(error))
        )
        .subscribe(() => {
          sessionStorage.setItem('registered_user', formValue.email);
          this.router.navigate(['welcome']);
        });
    }
  }

  public trackFormField(index: number, formField: RegistrationField) {
    return formField.name;
  }

  private getFormFieldValidators(formField: RegistrationField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (formField.required) {
      validators.push(Validators.required);
    }

    formField.validations?.map(({ name, value }) => {
      switch (name) {
        case 'regex':
          validators.push(Validators.pattern(value as string));
          break;
        case 'maxlength':
          validators.push(Validators.maxLength(value as number));
          break;
        case 'minlength':
          validators.push(Validators.minLength(value as number));
          break;
        default:
          throw new Error('invalid validation');
      }
    });

    return validators;
  }

  private handleRegisterError(err: HttpErrorResponse): never {
    this.form?.enable();

    let message = '';

    if (err.error) {
      message = err.error.message;
    } else {
      message = Array.isArray(err.message) ? err.message[0] : err.message;
    }

    this.matSnackBar.open(message, '', {
      politeness: 'assertive',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });

    throw err;
  }
}
