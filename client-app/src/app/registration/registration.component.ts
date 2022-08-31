import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, take, tap } from 'rxjs';
import { RegistrationField } from './models/registration-field';
import { Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';

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
    private registrationService: RegistrationService
  ) {
    this.formFields$ = this.route.data.pipe(
      map(({ formFields }) => formFields)
    );

    this.formFields$.pipe(take(1)).subscribe((formFields) => {
      const formGroup = this.formBuilder.group({});

      formFields.forEach((formField) => {
        formGroup.addControl(
          formField.name,
          this.formBuilder.control('dsda', {
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
          catchError((error) => {
            this.form?.enable();
            throw error;
          })
        )
        .subscribe(() => this.router.navigate(['welcome']));
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
}
