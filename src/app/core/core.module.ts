import { NgModule } from '@angular/core';
import { SignInModule } from '../sign-in/sign-in.module';
import { CitiesModuleModule } from './cities-module/cities-module.module';
import { FirebaseModule } from './firebase/firebase.module';



@NgModule({
  imports: [
    FirebaseModule,
    SignInModule,
    CitiesModuleModule,
  ],
  exports: [
    FirebaseModule,
    SignInModule,
    CitiesModuleModule,
  ],
})
export class CoreModule { }
