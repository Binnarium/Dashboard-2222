import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CompetenceDto } from './competence.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadAllCompetencesService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<Array<CompetenceDto>> = this.afFirestore
    .collection<CompetenceDto>('competences', q => q.orderBy(<keyof CompetenceDto>'name'))
    .valueChanges()
    .pipe(
      shareReplay(1),
    );
}
