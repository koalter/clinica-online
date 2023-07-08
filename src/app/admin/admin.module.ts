import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroAdminComponent } from './usuarios/registro-admin/registro-admin.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { FormAdminComponent } from './form-admin/form-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsuariosComponent,
    RegistroAdminComponent,
    FormAdminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MdbTabsModule,
    MdbFormsModule,
    MdbValidationModule,
    MdbRippleModule,
    RecaptchaModule,
    RecaptchaFormsModule
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
export class AdminModule { }
