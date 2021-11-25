import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [{ path: '', component: SignInComponent }];

@NgModule({
  declarations: [
    SignInComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class SignInModule { }
