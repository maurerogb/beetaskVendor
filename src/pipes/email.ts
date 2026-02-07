import { AbstractControl, ValidationErrors } from '@angular/forms';

export function strictEmail(control: AbstractControl): ValidationErrors | null {
    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return pattern.test(control.value)
        ? null
        : { strictEmail: true };
}
