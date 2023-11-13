import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

export function dateGreaterThanNowAndStartCustom(startDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate || selectedDate <= startDate) {
      return { dateError: true };
    }

    return null;
  };
}

export function NameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const validPattern = /^[A-Z][A-Za-z0-9./ -]*$/;
    if (!validPattern.test(control.value)) {
      return { NameInvalid: true };
    }

    return null;
  };
}
export function personNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const validPattern = /^[A-Z][A-Za-z ]*/;
    if (!validPattern.test(control.value)) {
      return { personNameInvalid: true };
    }

    return null;
  };
}
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const validPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!validPattern.test(control.value)) {
      return { passwordInvalid: true };
    }

    return null;
  };
}
export function institutionNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (!value) {
      return null;
    }
    const firstLetter = value.charAt(0);
    if (firstLetter !== firstLetter.toUpperCase()) {
      return { startWithCapital: true };
    }

    return null;
  };
}
