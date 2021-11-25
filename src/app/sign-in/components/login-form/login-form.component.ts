import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';

@Component({
  selector: 'dashboard-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnDestroy {

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _fb: FormBuilder,
  ) { }

  public readonly loginForm: FormGroup = this._fb.group({
    email: [null, Validators.email,],
    password: [null, Validators.minLength(6)],
  });

  private signInSub: Subscription | null = null;

  ngOnDestroy(): void {
    this.signInSub?.unsubscribe();
  }

  login(): void {
    if (this.signInSub)
      return;

    if (this.loginForm.invalid)
      return;

    const { email, password } = this.loginForm.value;

    this.signInSub = this._authService.login$(email, password).subscribe(
      success => {
        if (!success)
          alert('Ocurrió un error al iniciar sesión')

        this.signInSub?.unsubscribe();
        this.signInSub = null;
      }
    )
  }
  register(): void {
    if (this.signInSub)
      return;

    if (this.loginForm.invalid)
      return;

    const { email, password } = this.loginForm.value;

    this.signInSub = this._authService.register$(email, password).subscribe(
      success => {
        if (!success)
          alert('Ocurrió un error al registrarte')

        this.signInSub?.unsubscribe();
        this.signInSub = null;
      }
    )
  }

  get isSigningIn(): boolean {
    return !!this.signInSub;
  }
}
