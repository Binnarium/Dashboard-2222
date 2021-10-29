import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranscodeVideoService {
  constructor(
    private readonly aFunctions: AngularFireFunctions
  ) { }

  transcode$(path: string): Observable<boolean> {
    const fn = this.aFunctions.httpsCallable<{ path: string }, boolean>('VIDEO_transcodeVideo');

    return fn({ path }).pipe(
      catchError(e => {
        console.error(e);
        return of(false);
      })
    );
  }
}
