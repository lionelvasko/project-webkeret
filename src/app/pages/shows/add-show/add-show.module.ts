import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddShowComponent } from './add-show.component';
import { AddShowRoutingModule } from './add-show-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../../shared/services/storage.service';

@NgModule({
    declarations: [
      AddShowComponent
    ],
    imports: [
      CommonModule,
      AddShowRoutingModule,
      ReactiveFormsModule
    ]
  })
export class AddShowModule { 
    
  constructor(private storage: StorageService) { }
}