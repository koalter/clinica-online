import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class EspecialidadValidator {
    static otraEspecialidad(comparer: AbstractControl): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const esOtraEspecialidad = (comparer.value as string).toLowerCase() === 'otra';

            if (!esOtraEspecialidad) {
                return null;
            }

            return !control.value ? { confirmFormControl: { value: control.value } } : null;
        }
    }
}