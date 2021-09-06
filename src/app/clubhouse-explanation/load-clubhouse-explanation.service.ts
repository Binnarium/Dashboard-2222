import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ClubhouseExplanationDto } from './clubhouse-explanation.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadClubhouseExplanationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<ClubhouseExplanationDto | null> = this.afFirestore.collection('application')
    .doc<ClubhouseExplanationDto>('clubhouse-explanation')
    .valueChanges()
    .pipe(
      map(data => data ?? null),
      shareReplay(1),
    );
}
