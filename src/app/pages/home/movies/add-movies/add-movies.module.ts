import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMoviesComponent } from './add-movies.component';
import { AddMoviesRoutingModule } from './add-movies-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../../../shared/services/storage.service';

@NgModule({
    declarations: [
      AddMoviesComponent
    ],
    imports: [
      CommonModule,
      AddMoviesRoutingModule,
      ReactiveFormsModule
    ]
  })
export class AddMoviesModule { 
    
  constructor(private storage: StorageService) { }
}