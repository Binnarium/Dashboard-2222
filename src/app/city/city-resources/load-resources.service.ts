import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
              let publishedYear: number | null = null
              if (reading.publishedYear) {
                publishedYear = reading.publishedYear;
              }
              const newReading: ReadingDto = {
                about: reading.about,
                author: reading.author,
                cover: reading.cover,
                name: reading.name,
                link: reading.link,
                publishedYear
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
