import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPswdRoutingModule } from './forgot-pswd-routing.module';
import { ForgotPswdComponent } from './forgot-pswd.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgotPswdComponent
  ],
  imports: [
    CommonModule,
    ForgotPswdRoutingModule,
    ReactiveFormsModule
  ]
})
export class ForgotPswdModule { }
