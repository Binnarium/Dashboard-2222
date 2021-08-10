import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProjectDto } from './project.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadProjectService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(cityId: string): Observable<ProjectDto | null> {
    return this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<ProjectDto>('project')
      .valueChanges()
      .pipe(
        map(data => data ?? null),
        shareReplay(1),
      );
  }
}
