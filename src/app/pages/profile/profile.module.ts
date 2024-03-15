import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TicketsComponent } from './tickets/tickets.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    TicketsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTabsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
