import { Component, OnDestroy } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PlayersTypes } from "../shared/data/players-types.data";
import { PlayersFiltersModel } from './filters.model';
import { LoadPlayersService } from './load-players.service';
import { PlayerModel } from './player.model';
import { UpdateCourseStatusService } from './update-course-status.service';
import { UpdatePlayerTypeService } from './update-player-type.service';
import { UpdatePlayerWebAccessService } from './update-player-web-access.service';
@Component({
  selector: 'dashboard-players',
  templateUrl: './players.component.html',
})
export class PlayersComponent implements OnDestroy {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly loadPlayerService: LoadPlayersService,
    private readonly _afFunctions: AngularFireFunctions,
    private readonly _updateCourseStatusService: UpdateCourseStatusService,
    private readonly _updatePlayerTypeService: UpdatePlayerTypeService,
    private readonly _updatePlayerWebAccessService: UpdatePlayerWebAccessService,
  ) { }

  private _savingSub: Subscription | null = null;

  public playersTypes: Array<string> = PlayersTypes;

  public readonly params$: Observable<PlayersFiltersModel> = this.route.queryParams;

  public readonly queriesByPlayerType$: Observable<boolean> = this.params$.pipe(map(p => !!p.playerType))

  public readonly players$: Observable<Array<PlayerModel>> = this.params$.pipe(
    switchMap((params) => this.loadPlayerService.getPlayers$(params)),
  );

  ngOnDestroy(): void {
    this._savingSub?.unsubscribe();
  }

  updateCourseStatus(playerId: string, value: string) {
    if (!!this._savingSub)
      return

    this._savingSub = this._updateCourseStatusService.save$(playerId, value).subscribe((saved) => {
      if (!saved)
        alert('Ocurrio un problema al actualizar los datos');

      this._savingSub?.unsubscribe();
      this._savingSub = null;
    });
  }

  updatePlayerType(playerId: string, value: string) {
    if (!!this._savingSub)
      return

    this._savingSub = this._updatePlayerTypeService.save$(playerId, value).subscribe((saved) => {
      if (!saved)
        alert('Ocurrio un problema al actualizar los datos');

      this._savingSub?.unsubscribe();
      this._savingSub = null;
    });
  }

  updatePlayerWebAccess(playerId: string, value: boolean) {
    if (!!this._savingSub)
      return

    this._savingSub = this._updatePlayerWebAccessService.save$(playerId, value).subscribe((saved) => {
      if (!saved)
        alert('Ocurrio un problema al actualizar los datos');

      this._savingSub?.unsubscribe();
      this._savingSub = null;
    });
  }

  connectPubPub(uid: string, name: string) {
    if (!!this._savingSub)
      return

    const profileUrl = prompt(`Ingresa la Url del perfil de ${name}`);

    if (!profileUrl)
      return;

    const fn = this._afFunctions.httpsCallable<{ profileUrl: string, playerUid: string }, { pubsFound: number, pubsWatchersCreated: number, pubsWatchersExisting: number }>('CONTRIBUTIONS_updatePubWatchersFromProfile');

    this._savingSub = fn({ playerUid: uid, profileUrl }).subscribe((res) => {
      alert(`Econtrados: ${res.pubsFound}; Nuevos: ${res.pubsWatchersCreated}; Existentes: ${res.pubsWatchersExisting}`);
    },
      error => console.error(error),
      () => {
        this._savingSub?.unsubscribe();
        this._savingSub = null;
      }
    );
  }

  get isSaving(): boolean { return !!this._savingSub };
}
