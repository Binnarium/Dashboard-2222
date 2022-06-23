import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PlayersFiltersModel } from './filters.model';
import { PlayerModel } from './player.model';

@Injectable({ providedIn: 'root' })
export class LoadPlayersService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public getPlayers$(p: PlayersFiltersModel): Observable<Array<PlayerModel>> {
    return this.afFirestore
      .collection<PlayerModel>(
        'players',
        q => {
          let query = q
            .orderBy(<keyof PlayerModel>'displayName');
          if (!!p.playerType)
            query = query.where(<keyof PlayerModel>'playerType', '==', p.playerType)
          return query;
        },
      )
      .valueChanges()
      .pipe(
        startWith([])
      );
  }

  public getPlayer$(playerId: string): Observable<PlayerModel | null> {
    return this.afFirestore.collection<PlayerModel>('players').doc(playerId)
      .valueChanges()
      .pipe(
        map(p => p ?? null)
      );
  }
}
