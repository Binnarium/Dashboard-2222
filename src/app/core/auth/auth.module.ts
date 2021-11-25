import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanAccessDashboardGuard } from './can-access-dashboard.guard';
import { UserService } from './user.service';

@NgModule({
  providers: [
    UserService,
    AuthenticationService,
    CanAccessDashboardGuard,
  ]
})
export class AuthModule { }
