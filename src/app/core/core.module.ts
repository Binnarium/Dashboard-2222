import { NgModule } from '@angular/core';
import { CitiesModuleModule } from './cities-module/cities-module.module';
import { FirebaseModule } from './firebase/firebase.module';



@NgModule({
  imports: [
    FirebaseModule,
    CitiesModuleModule
  ],
  exports: [
    FirebaseModule,
    CitiesModuleModule
  ],
})
export class CoreModule { }
