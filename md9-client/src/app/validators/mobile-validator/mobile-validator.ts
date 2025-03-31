import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom Validator for Israeli mobile numbers.
 * - Must be exactly 10 digits.
 * - Must start with a valid Israeli mobile prefix.
 */
export function mobileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null; // If empty, let other required validators handle it

    const pattern = /^(050|052|054|058|053|055|051|056|058|059)\d{7}$/;

    return pattern.test(value) ? null : { invalidMobile: true };
  };
}
