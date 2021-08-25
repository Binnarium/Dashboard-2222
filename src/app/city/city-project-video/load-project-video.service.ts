import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CityProjectVideoDto } from './city-project-video.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadProjectVideoService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(cityId: string): Observable<CityProjectVideoDto | null> {
    return this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<CityProjectVideoDto>('project-video')
      .valueChanges()
      .pipe(
        map(data => data ?? null),
        shareReplay(1),
      );
  }
}
