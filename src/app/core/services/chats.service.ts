import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { PlayerModel } from 'src/app/players/player.model';

export interface ChatModel {
  id: string;
  participants?: Array<Pick<PlayerModel, 'displayName' | 'uid'>>
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public chatsGroups$ = this.afFirestore.collection<ChatModel>('chats',
    q => q.orderBy('id').where('kind', '==', 'CHAT#GROUP'),
  )
    .valueChanges()
    .pipe(
      startWith([]),
      shareReplay(1),
    );

  public getChat$(groupId: string): Observable<ChatModel | null> {
    return this.afFirestore.collection<ChatModel>('chats').doc(groupId)
      .valueChanges()
      .pipe(
        map(p => p ?? null)
      );
  }
}
