import { NgModule } from '@angular/core';
import { CanAccessDashboardGuard } from './can-access-dashboard.guard';
import { SignInWithGoogleService } from './sign-in-with-google.service';
import { SignInWithUtplService } from './sign-in-with-utpl.service';
import { UserService } from './user.service';

@NgModule({
  providers: [
    SignInWithGoogleService,
    SignInWithUtplService,
    UserService,
    CanAccessDashboardGuard,
  ]
})
export class AuthModule { }
