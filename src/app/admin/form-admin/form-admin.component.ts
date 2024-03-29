import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Administrador } from '../../shared/domains/usuario.model';
import { PasswordValidator } from '../../shared/validators/password.validator';
import { Subscription } from 'rxjs';
import { CaptchaService } from '../../shared/services/captcha.service';

@Component({
  selector: 'form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.scss']
})
export class FormAdminComponent implements OnInit, OnDestroy {
  @Output() submitir: EventEmitter<any> = new EventEmitter<any>();
  formulario!: FormGroup;
  rutaImagen!: string;
  captcha$!: Subscription;

  constructor(private fb: FormBuilder,
    private captchaService: CaptchaService) {
    }
    
  ngOnInit(): void {
    this.rutaImagen = '../../../../assets/default.jpg';
    
    this.formulario = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      edad: [null, [Validators.required, Validators.pattern('[0-9]+'), Validators.min(18)]],
      dni: [null, [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(7), Validators.maxLength(8)]],
      mail: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      password2: [null, Validators.required],
      imagen: [undefined, Validators.required],
      captcha: [null, Validators.required]
    });

    this.password2.addValidators(PasswordValidator.match(this.password));
    this.captcha$ = this.captchaService.get().subscribe(token => {
      this.captcha.setValue(token);
    });
  }

  ngOnDestroy(): void {
    this.captcha$.unsubscribe();
  }

  get nombre(): AbstractControl {
    return this.formulario.get('nombre')!;
  }

  get apellido(): AbstractControl {
    return this.formulario.get('apellido')!;
  }

  get edad(): AbstractControl {
    return this.formulario.get('edad')!;
  }

  get dni(): AbstractControl {
    return this.formulario.get('dni')!;
  }

  get mail(): AbstractControl {
    return this.formulario.get('mail')!;
  }

  get password(): AbstractControl {
    return this.formulario.get('password')!;
  }

  get password2(): AbstractControl {
    return this.formulario.get('password2')!;
  }

  get imagen(): AbstractControl {
    return this.formulario.get('imagen')!;
  }
  
  get captcha(): AbstractControl {
    return this.formulario.get('captcha')!;
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const usuario = new Administrador(this.nombre.value, this.apellido.value, this.edad.value, this.dni.value,
        this.mail.value, this.password.value, this.imagen.value.name);


      const req = {
        usuario: usuario,
        password: this.password.value,
        imagenes: [this.imagen.value]
      }
      this.submitir.emit(req);
    }
  }

  imagen_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    
    if (event.target.files && event.target.files.length
      && archivo.size < 100 * 1024) {
      const reader = new FileReader();
      this.formulario.get(elementoId)?.setValue(archivo);
      reader.readAsDataURL(this.formulario.get(elementoId)?.value);

      reader.onload = () => {
        this.rutaImagen = reader.result as string;
      };
    } else {
      event.target.value = '';
    }
  }

  validarNumero(event: KeyboardEvent): void {
    if (isNaN(parseInt(event.key)) && event.key !== 'Tab' && event.key !== 'Escape' 
      && event.key !== 'Backspace' && event.key !== 'Delete' && !event.key.includes('Arrow')) {
      event.preventDefault();
    }
  }
}
