import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class EspecialidadValidator {
    static habilitarValidaciones(comparer: AbstractControl): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const esOtraEspecialidad = (control.value as string)?.toLowerCase() === 'otra';

            if (esOtraEspecialidad) {
                comparer.enable();
            } else {
                comparer.disable();
            }

            return null;
        }
    }
}