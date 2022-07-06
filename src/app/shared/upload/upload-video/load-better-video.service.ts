import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VideoDTO } from '../asset.dto';
import { BetterVideoModel } from './better-video.model';

@Injectable({ providedIn: 'root' })
export class LoadBetterVideoService {
  constructor(
    private readonly database: AngularFireDatabase
  ) { }


  load$(video: VideoDTO): Observable<BetterVideoModel | null> {
    if (!video.path)
      return of(null);

    const videoPath: string = video.path.replace(/[&/\\#, +()$~%.'":*?<>{}]/g, '_');

    return this.database.object<BetterVideoModel>(`videos/${videoPath}`).snapshotChanges().pipe(
      map(snap => snap.payload.val() ?? null)
    );
  }
}
