import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileThingComponent } from './profile-thing/profile-thing.component';
import { TicketsComponent } from './tickets/tickets.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileThingComponent,
    TicketsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTabsModule
  ]
})
export class ProfileModule { }
