import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ContributionExplanationDto } from './contribution-explanation.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadContributionExplanationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<ContributionExplanationDto | null> = this.afFirestore.collection('application')
    .doc<ContributionExplanationDto>('contribution-explanation')
    .valueChanges()
    .pipe(
      map(data => data ?? null),
      shareReplay(1),
    );
}
