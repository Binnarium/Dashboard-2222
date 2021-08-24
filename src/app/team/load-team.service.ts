import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TeamDto } from './team.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadTeamService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<TeamDto | null> = this.afFirestore.collection('application')
    .doc<TeamDto>('team')
    .valueChanges()
    .pipe(
      map(data => data ?? null),
      shareReplay(1),
    );
}
