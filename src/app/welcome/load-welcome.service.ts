import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WelcomeDto } from './welcome.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadWelcomeService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<WelcomeDto | null> = this.afFirestore.collection('cities')
    .doc<WelcomeDto>('welcome')
    .valueChanges()
    .pipe(
      map(data => data ?? null),
      shareReplay(1),
    );
}
