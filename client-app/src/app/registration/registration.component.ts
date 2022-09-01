import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, take, tap } from 'rxjs';
import { RegistrationField } from './models/registration-field';
import { Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

      this.registrationService
        .register(this.form?.value)
        .pipe(
          take(1),
          catchError(({ error }) => {
            this.matSnackBar.open(error.message[0], '', {
              politeness: 'assertive',
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });

            this.form?.enable();
            throw error;
          })
        )
        .subscribe(() => {
          sessionStorage.setItem('registered_user', this.form?.value.email);
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
          console.log(value);
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
}
