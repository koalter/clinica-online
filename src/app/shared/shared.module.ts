import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { HeaderComponent } from './components/header/header.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { FormEspecialistaComponent } from './components/form-especialista/form-especialista.component';
import { ButtonVolverComponent } from './components/button-volver/button-volver.component';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { LinkButtonComponent } from './components/link-button/link-button.component';
import { CentimetrosPipe } from './pipes/centimetros.pipe';
import { KilogramosPipe } from './pipes/kilogramos.pipe';
import { TemperaturaPipe } from './pipes/temperatura.pipe';
import { NumberValidatorDirective } from './directives/number-validator.directive';
import { CharacterValidatorDirective } from './directives/character-validator.directive';
import { InputDetectorDirective } from './directives/input-detector.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FormPacienteComponent,
    FormEspecialistaComponent,
    ButtonVolverComponent,
    LinkButtonComponent,
    CentimetrosPipe,
    KilogramosPipe,
    TemperaturaPipe,
    NumberValidatorDirective,
    CharacterValidatorDirective,
    InputDetectorDirective
  ],
  imports: [
    CommonModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbValidationModule,
    ReactiveFormsModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  exports: [
    HeaderComponent,
    FormPacienteComponent,
    FormEspecialistaComponent,
    ButtonVolverComponent,
    LinkButtonComponent,
    CentimetrosPipe,
    KilogramosPipe,
    TemperaturaPipe,
    NumberValidatorDirective,
    CharacterValidatorDirective,
    InputDetectorDirective
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: "6Ld-T7EmAAAAAC13UxNAntbnBd6-w5Q6QsdyKs2X" } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es'
    }
  ]
})
export class SharedModule { }
