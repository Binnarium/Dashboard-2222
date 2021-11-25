import { Component } from '@angular/core';
import { AuthenticationService } from '../core/auth/authentication.service';
import { UserService } from '../core/auth/user.service';

@Component({
  selector: 'dashboard-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {

  constructor(
    private readonly userService: UserService,
    private readonly _authService: AuthenticationService,
  ) { }

  public readonly user$ = this.userService.user$;

  signOut(): void {
    this._authService.signOut();
  }
}
