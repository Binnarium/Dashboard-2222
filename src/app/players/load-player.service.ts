import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PlayerModel } from './player.model';

@Injectable({ providedIn: 'root' })
export class LoadPlayersService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public getPlayers$(): Observable<Array<PlayerModel>> {
    return this.afFirestore
      .collection<PlayerModel>(
        'players',
        q => q.orderBy(<keyof PlayerModel>'displayName')
      )
      .valueChanges();
  }
}
