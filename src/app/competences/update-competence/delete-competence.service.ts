
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CompetenceDto } from '../competence.dto';

@Injectable({
  providedIn: 'root'
})
export class DeleteCompetenceService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public delete$(competenceId: string): Observable<boolean> {
    const deleteTask = this.afFirestore.collection('competences')
      .doc<CompetenceDto>(competenceId)
      .delete();

    return from(deleteTask).pipe(
      mapTo(true),
      catchError(() => of(false)),
    );
  }
}
