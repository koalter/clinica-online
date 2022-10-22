import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static confirmFormControl(comparer: AbstractControl): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const valuesAreEqual = comparer.value === control.value;
            return !valuesAreEqual ? { confirmFormControl: { value: control.value } } : null;
        }
    }
}
