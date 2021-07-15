import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { ISignIn as ISign } from './i-sign-in';

@Injectable({
  providedIn: 'root'
})
export class SignOutService implements ISign {

  constructor(
    private readonly afAuth: AngularFireAuth,
  ) { }

  sign$(): Observable<boolean> {
    const signOut = this.afAuth.signOut();
    return from(signOut).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }
}
