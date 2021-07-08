import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { WelcomeDto } from './welcome.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveWelcomeService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(payload: WelcomeDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('cities')
      .doc<WelcomeDto>('welcome')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
