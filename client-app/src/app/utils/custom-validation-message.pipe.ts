import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FieldValidation } from '../registration/models/field-validation';

@Pipe({
  name: 'customValidationMessage',
  pure: true,
})
export class CustomValidationMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors, validations?: FieldValidation[]): string {
    const validatorsMap = new Map<string, string>([['regex', 'pattern']]);

    let errorMessage = 'The form field is invalid.';

    if (errors['required']) {
      errorMessage = 'The form field is required.';
    } else {
      const customMessage = validations?.find(({ name }) => {
        const property = validatorsMap.has(name)
          ? (validatorsMap.get(name) as string)
          : name;

        return errors.hasOwnProperty(property);
      })?.message;

      if (customMessage) {
        errorMessage = customMessage;
      }
    }

    return errorMessage;
  }
}
