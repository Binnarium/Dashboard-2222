import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, startWith } from 'rxjs/operators';
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
    private readonly afFunctions: AngularFireFunctions,
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

  public createChat$(name: string): Observable<string | null> {
    //
    const createFunc = this.afFunctions.httpsCallable<{ name: string }, { id: string }>('CHAT_createGroupChat');
    return from(createFunc({ name }))
      .pipe(
        map(res => res.id ?? null),
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }
}
