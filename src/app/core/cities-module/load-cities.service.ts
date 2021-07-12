import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CityDto } from './city.dto';


@Injectable({
  providedIn: 'root'
})
export class LoadCitiesService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public readonly cities$: Observable<Array<CityDto>> = this.afFirestore
    .collection<CityDto>('cities', q => q.orderBy('stage'))
    .valueChanges()
    .pipe(
      shareReplay(1),
    );
}
