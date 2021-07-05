import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export interface CitiesDto {
  stage: number;
  iconUrl: string;
  id: string;
  name: string;
  configuration: {
    colorHex: number,
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoadCitiesService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public readonly cities$: Observable<Array<CitiesDto>> = this.afFirestore
    .collection<CitiesDto>('cities', q => q.orderBy('stage'))
    .valueChanges()
    .pipe(
      shareReplay(1),
    );
}
