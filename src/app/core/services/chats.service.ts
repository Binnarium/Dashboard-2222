import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerModel } from 'src/app/players/player.model';

export interface ChatModel {
  participants: Array<Pick<PlayerModel, 'displayName' | 'uid'>>
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public getChat$(groupId: string): Observable<ChatModel | null> {
    return this.afFirestore.collection<ChatModel>('chats').doc(groupId)
      .valueChanges()
      .pipe(
        map(p => p ?? null)
      );
  }

}
