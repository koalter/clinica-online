import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
    static match(comparer: AbstractControl): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const valuesAreEqual = comparer.value === control.value;
            return !valuesAreEqual ? { confirmFormControl: { value: control.value } } : null;
        }
    }
}
