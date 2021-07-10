import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConfigurationDto, AppConfigurationFirebaseDto } from './app-configuration.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadAppConfigurationService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<AppConfigurationDto | null> = this.afFirestore
    .collection('application')
    .doc<AppConfigurationFirebaseDto>('_configuration_')
    .valueChanges()
    .pipe(
      map(data => !data ? null : <AppConfigurationDto>{ courseFinalizationDate: data.courseFinalizationDate?.toDate() }),
      shareReplay(1),
    );
}
