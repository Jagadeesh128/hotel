import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEmailvalidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailvalidatorDirective,
    multi: true,
  },],
})
export class EmailvalidatorDirective {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    const value = control.value as string;
    if(value.includes('test')) {
      return {
        invalidEmail: true,
      }
    }
    return null;
  }

}
