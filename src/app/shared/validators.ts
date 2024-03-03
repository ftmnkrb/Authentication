import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

// ama buraya baktığında password1 ve password2 yazıyor.
// bizim form'umuzda bu password ve rePassword olarak adlandırdık.

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return control.value.password === control.value.rePassword
    ? null
    : { PasswordNoMatch: true }
}

// https://blog.bitsrc.io/implementing-confirm-password-validation-in-angular-with-custom-validators-6acd01cb0288
