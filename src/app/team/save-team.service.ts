import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { TeamDto } from './team.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveTeamService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(payload: TeamDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('application')
      .doc<TeamDto>('team')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
