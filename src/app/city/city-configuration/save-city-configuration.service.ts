import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CityDto } from 'src/app/core/cities-module/city.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveCityConfigurationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: CityDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('cities')
      .doc<CityDto>(cityId)
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);

        return of(false)
      }),
    );
  }
}
