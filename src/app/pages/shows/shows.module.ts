import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowsRoutingModule } from './shows-routing.module';
import { ShowsComponent } from './shows.component';
import { ShowsDashboardComponent } from './shows-dashboard/shows-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTabsModule} from '@angular/material/tabs';
import { SeatsComponent } from './seats/seats.component';
import { ShowsService } from '../../shared/services/shows.service';
import { TimestampPipe } from '../../shared/pipes/timestamp.pipe';

@NgModule({
  declarations: [
    ShowsComponent,
    ShowsDashboardComponent,
    SeatsComponent,
    TimestampPipe
  ],
  imports: [
    CommonModule,
    ShowsRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  providers: [
    ShowsService
  ]
})
export class ShowsModule { }
