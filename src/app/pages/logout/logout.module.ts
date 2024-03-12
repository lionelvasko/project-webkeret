import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    LogoutRoutingModule,
    ReactiveFormsModule
  ]
})
export class LogoutModule { }
