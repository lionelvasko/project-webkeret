import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPswdRoutingModule } from './forgot-pswd-routing.module';
import { ForgotPswdComponent } from './forgot-pswd.component';


@NgModule({
  declarations: [
    ForgotPswdComponent
  ],
  imports: [
    CommonModule,
    ForgotPswdRoutingModule
  ]
})
export class ForgotPswdModule { }
