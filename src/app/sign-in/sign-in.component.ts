import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SignInWithGoogleService } from '../core/auth/sign-in-with-google.service';
import { SignInWithUtplService } from '../core/auth/sign-in-with-utpl.service';
import { SignOutService } from '../core/auth/sign-out.service';
import { UserService } from '../core/auth/user.service';

@Component({
  selector: 'dashboard-sign-in',
  templateUrl: './sign-in.component.html',
  styles: [
  ]
})
export class SignInComponent implements OnDestroy {

  constructor(
    private readonly utplSignInService: SignInWithUtplService,
    private readonly googleService: SignInWithGoogleService,
    private readonly signOutService: SignOutService,
    private readonly userService: UserService,
  ) { }

  private signInSub: Subscription | null = null;

  public readonly user$ = this.userService.user$;

  ngOnDestroy() {
    this.signInSub?.unsubscribe();
  }

  utplSignIn(): void {
    if (this.signInSub)
      return;

    this.signInSub = this.utplSignInService.sign$().subscribe(
      success => {
        if (!success)
          alert('Ocurrió un error al iniciar sesión')

        this.signInSub?.unsubscribe();
        this.signInSub = null;
      }
    )
  }

  googleSignIn(): void {
    if (this.signInSub)
      return;

    this.signInSub = this.googleService.sign$().subscribe(
      success => {
        if (!success)
          alert('Ocurrió un error al iniciar sesión')

        this.signInSub?.unsubscribe();
        this.signInSub = null;
      }
    )
  }

  signOut(): void {
    if (this.signInSub)
      return;

    this.signInSub = this.signOutService.sign$().subscribe(
      success => {
        if (!success)
          alert('Ocurrió un error al cerrar sesión')

        this.signInSub?.unsubscribe();
        this.signInSub = null;
      }
    )
  }

  get isSigningIn(): boolean {
    return !!this.signInSub;
  }
}
