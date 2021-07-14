import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CityResourcesDto, FirebaseCityResourcesDto, FirebaseReadingDto } from './city-resources.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveResourcesService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: CityResourcesDto): Observable<boolean> {

    const saveValue: FirebaseCityResourcesDto = {
      externalLinks: payload.externalLinks,
      readings: payload?.readings?.map(reading => {
        const firebaseReading: FirebaseReadingDto = {
          about: reading.about,
          author: reading.author,
          cover: reading.cover,
          name: reading.name,
          publishedDate: reading.publishedDate ? firebase.firestore.Timestamp.fromDate(new Date(reading.publishedDate)) : null,
        };
        return firebaseReading;
      }) ?? null,
    };

    const saveTask = this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<FirebaseCityResourcesDto>('resources')
      .set(saveValue, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);

        return of(false)
      }),
    );
  }
}
