import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ClubhouseDto } from './clubhouse.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadClubhouseService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(cityId: string): Observable<ClubhouseDto | null> {
    return this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<ClubhouseDto>('clubhouse')
      .valueChanges()
      .pipe(
        map(data => data ?? null),
        shareReplay(1),
      );
  }
}
