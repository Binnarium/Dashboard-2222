import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly userService: UserService,
  ) { }

  /// sign a user with their credential
  login$(email: string, password: string): Observable<boolean> {
    const login = this.afAuth.signInWithEmailAndPassword(email, password);
    return from(login).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  /// create a new account using the email and password, but first before creating any account
  /// validation to check if administrator account is registered
  register$(email: string, password: string): Observable<boolean> {
    /// create account
    const register = this._registerNewAccount(email, password);
    return from(register).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  /**
   * Register and handle different cases to register a new user
   *
   * Also, customize errors thrown.
   * @param email new user address
   * @param password for new account
   */
  private async _registerNewAccount(email: string, password: string): Promise<void> {
    /// validate user has an account
    console.log('FIXME: remove to promise')
    const userSnap = await this.userService.userDocument(email).get().toPromise() ?? null;

    if (!userSnap)
      throw new Error('account-not-found');

    const userData = userSnap.exists ? userSnap.data()! : null;

    /// validate user has a role in the predefined accounts to create a new user
    if (!userData)
      throw new Error('account-not-found');

    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.code ?? 'something-went-wrong');
    }
  }

  /// close current user account
  async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }
}
