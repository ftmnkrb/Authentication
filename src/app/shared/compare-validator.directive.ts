import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[compare]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }]
})
export class CompareValidatorDirective implements Validator {
  @Input('compare') controlNameToCompare: string = '';

  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.root.get(this.controlNameToCompare);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
