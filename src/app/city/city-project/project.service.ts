import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { ProjectDto } from './project.dto';


@Injectable({
  providedIn: 'root'
})
export class SaveProjectService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: ProjectDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<ProjectDto>('project')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
