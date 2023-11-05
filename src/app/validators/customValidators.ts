import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateGreaterThanNowValidator(
  control: AbstractControl
): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    return { dateGreaterThanNow: true };
  }

  return null;
}

export function dateGreaterThanNowAndStart(
  control: AbstractControl
): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();
  const startDateControl = control.root.get('start_date');
  if (!startDateControl) {
    return null;
  }

  const start_date = new Date(startDateControl.value);

  if (selectedDate <= currentDate || selectedDate <= start_date) {
    return { dateError: true };
  }

  return null;
}
