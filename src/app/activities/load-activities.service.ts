import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivitiesDto } from './activities.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadActivitiesService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(): Observable<ActivitiesDto | null> {
    return this.afFirestore.collection('application')
      .doc<ActivitiesDto>('activities')
      .valueChanges()
      .pipe(
        map(data => data ?? null),
        shareReplay(1),
      );
  }
}
