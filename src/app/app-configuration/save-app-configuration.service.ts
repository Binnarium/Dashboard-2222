import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { AppConfigurationDto, AppConfigurationFirebaseDto } from './app-configuration.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveAppConfigurationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(payload: AppConfigurationDto): Observable<boolean> {

    const saveVal: AppConfigurationFirebaseDto = {
      courseFinalizationDate: !!payload?.courseFinalizationDate ? firebase.firestore.Timestamp.fromDate(payload.courseFinalizationDate) : null
    };

    const saveTask = this.afFirestore.collection('application')
      .doc<AppConfigurationFirebaseDto>('_configuration_')
      .set(saveVal, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);

        return of(false)
      }),
    );
  }
}
