import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mapTo, shareReplay, startWith } from 'rxjs/operators';
import { PlayerModel } from 'src/app/players/player.model';

type _UpdateCourseStatusModel = Pick<PlayerModel, 'courseStatus'>;
type _UpdatePlayerTypeModel = Pick<PlayerModel, 'playerType'>;
type _UpdatePlayerWebAccessModel = Pick<PlayerModel, 'allowWebAccess'>;

@Injectable({ providedIn: 'root' })
export class PlayerService {
    constructor(
        private readonly afFirestore: AngularFirestore,
    ) { }

    players$: Observable<Array<PlayerModel>> = this.afFirestore
        .collection<PlayerModel>('players', q => q.orderBy(<keyof PlayerModel>'displayName'))
        .valueChanges()
        .pipe(
            startWith([]),
            shareReplay(1),
        );

    // public getPlayers$(p: PlayersFiltersModel): Observable<Array<PlayerModel>> {
    //     return this.afFirestore
    //       .collection<PlayerModel>(
    //         'players',
    //         q => {
    //           let query = q
    //             .orderBy(<keyof PlayerModel>'displayName');
    //           if (!!p.playerType)
    //             query = query.where(<keyof PlayerModel>'playerType', '==', p.playerType)
    //           return query;
    //         },
    //       )
    //       .valueChanges()
    //       .pipe(
    //         startWith([])
    //       );
    //   }


    public getPlayer$(playerId: string): Observable<PlayerModel | null> {
        return this.afFirestore.collection<PlayerModel>('players').doc(playerId)
            .valueChanges()
            .pipe(
                map(p => p ?? null)
            );
    }

    public updateCourseStatus$(playerId: string, courseStatus: string): Observable<boolean> {
        const payload: _UpdateCourseStatusModel = { courseStatus };

        const saveTask = this.afFirestore.collection<_UpdateCourseStatusModel>('players')
            .doc(playerId)
            .set(payload, { merge: true });

        return from(saveTask).pipe(
            mapTo(true),
            catchError(err => {
                console.log(err);

                return of(false)
            }),
        );
    }

    public updateWebAccess$(playerId: string, allowWebAccess: boolean): Observable<boolean> {
        const payload: _UpdatePlayerWebAccessModel = { allowWebAccess };

        const saveTask = this.afFirestore.collection<_UpdatePlayerWebAccessModel>('players')
            .doc(playerId)
            .set(payload, { merge: true });

        return from(saveTask).pipe(
            mapTo(true),
            catchError(err => {
                console.log(err);

                return of(false)
            }),
        );
    }

    public updatePlayerType$(playerId: string, playerType: string): Observable<boolean> {
        const payload: _UpdatePlayerTypeModel = { playerType };

        const saveTask = this.afFirestore.collection<_UpdatePlayerTypeModel>('players')
            .doc(playerId)
            .set(payload, { merge: true });

        return from(saveTask).pipe(
            mapTo(true),
            catchError(err => {
                console.log(err);

                return of(false)
            }),
        );
    }



}