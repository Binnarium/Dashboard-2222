import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CompetenceDto } from 'src/app/competences/competence.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadAllValidCompetencesService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<Array<CompetenceDto>> = this.afFirestore
    .collection<CompetenceDto>('competences',
      q => q.orderBy(<keyof CompetenceDto>'name').where(<keyof CompetenceDto>'name', '!=', null)
    )
    .valueChanges()
    .pipe(

      shareReplay(1),
    );
}
