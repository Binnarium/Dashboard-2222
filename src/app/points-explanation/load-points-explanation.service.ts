import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PointsExplanationDto } from './points-explanation.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadPointsExplanationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<PointsExplanationDto | null> = this.afFirestore.collection('application')
    .doc<PointsExplanationDto>('points-explanation')
    .valueChanges()
    .pipe(
      map(data => data ?? null),
      shareReplay(1),
    );
}
