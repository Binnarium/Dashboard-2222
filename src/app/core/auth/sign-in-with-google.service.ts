import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { ISignIn } from './i-sign-in';

@Injectable({
  providedIn: 'root'
})
export class SignInWithGoogleService implements ISignIn {

  constructor(
    private readonly afAuth: AngularFireAuth,
  ) { }

  sign$(): Observable<boolean> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const signIn = this.afAuth.signInWithRedirect(provider);
    return from(signIn).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false);

      })
    );
  }
}
