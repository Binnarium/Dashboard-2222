import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerTypePipe } from './players-types.data';



@NgModule({
  declarations: [
    PlayerTypePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PlayerTypePipe
  ]
})
export class DataModule { }
