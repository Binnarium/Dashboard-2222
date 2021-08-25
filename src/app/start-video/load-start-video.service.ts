import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StartVideoDto } from './start-video.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadStartVideoService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(): Observable<StartVideoDto | null> {
    return this.afFirestore.collection('application')
      .doc<StartVideoDto>('start-video')
      .valueChanges()
      .pipe(
        map(data => data ?? null),
        shareReplay(1),
      );
  }
}
