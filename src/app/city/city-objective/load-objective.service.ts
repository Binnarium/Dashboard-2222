import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ObjectiveDto, ObjectiveFirebaseDto } from './objective.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadObjectiveService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(cityId: string): Observable<ObjectiveDto | null> {
    return this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<ObjectiveFirebaseDto>('objective')
      .valueChanges()
      .pipe(
        map(data => {
          const competences: { [key: string]: boolean } = {};
          data?.competences?.forEach(c => competences[c.id] = true);

          const mapperObjective: ObjectiveDto = {
            competences,
            content: data?.content ?? null,
            ideas: data?.ideas ?? null,
            mainObjective: data?.mainObjective ?? null
          }

          return mapperObjective;
        }),
        shareReplay(1),
      );
  }
}
