import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { ISignIn } from './i-sign-in';

@Injectable({
  providedIn: 'root'
})
export class SignInWithUtplService implements ISignIn {

  constructor(
    private readonly afAuth: AngularFireAuth,
  ) { }

  sign$(): Observable<boolean> {
    const provider = new firebase.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
      prompt: 'consent',
      tenant: '6eeb49aa-436d-43e6-becd-bbdf79e5077d',
    });

    const signIn = this.afAuth.signInWithPopup(provider);
    return from(signIn).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false);

      })
    );
  }
}
