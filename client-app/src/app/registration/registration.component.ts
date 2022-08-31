import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegistrationField } from './models/registration-field';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public formFields$: Observable<RegistrationField[]>;
  public form?: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formFields$ = this.route.data.pipe(
      map(({ formFields }) => formFields)
    );

    this.formFields$.subscribe((formFields) => {
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
