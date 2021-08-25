import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CityManualVideoDto } from './city-manual-video.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadManualVideoService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(cityId: string): Observable<CityManualVideoDto | null> {
    return this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<CityManualVideoDto>('manual-video')
      .valueChanges()
      .pipe(
        map(data => data ?? null),
        shareReplay(1),
      );
  }
}
