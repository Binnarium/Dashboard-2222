import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CityResourcesDto, FirebaseCityResourcesDto, ReadingDto } from './city-resources.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadResourcesService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(cityId: string): Observable<CityResourcesDto | null> {
    return this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<FirebaseCityResourcesDto>('resources')
      .valueChanges()
      .pipe(
        map(data => {
          const content: CityResourcesDto = {
            externalLinks: data?.externalLinks ?? null,
            readings: data?.readings?.map(reading => {
              let publishedDate: string | null = null
              if (reading.publishedDate) {
                publishedDate = reading.publishedDate.toDate().toISOString().split('T')[0]
              }
              const newReading: ReadingDto = {
                about: reading.about,
                author: reading.author,
                cover: reading.cover,
                name: reading.name,
                publishedDate
              };
              return newReading;
            }) ?? null
          }
          return content;
        }),
        shareReplay(1),
      );
  }
}
