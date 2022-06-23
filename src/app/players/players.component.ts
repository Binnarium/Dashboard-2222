import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerService } from '../core/services/player.service';
import { PlayersTypes } from "../shared/data/players-types.data";
import { PlayersFiltersModel } from './filters.model';
import { PlayerModel } from './player.model';
@Component({
  selector: 'dashboard-players',
  templateUrl: './players.component.html',
})
export class PlayersComponent implements OnDestroy {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly playerService: PlayerService,
  ) { }

  private _savingSub: Subscription | null = null;

  public playersTypes: Array<string> = PlayersTypes;

  public readonly params$: Observable<PlayersFiltersModel> = this.route.queryParams;

  public readonly queriesByPlayerType$: Observable<boolean> = this.params$.pipe(map(p => !!p.playerType))

  public readonly players$: Observable<Array<PlayerModel>> = this.playerService.players$;

  // public readonly players$: Observable<Array<PlayerModel>> = this.params$.pipe(
  //   switchMap((params) => this.playerService.getPlayers$(params)),
  // );

  ngOnDestroy(): void {
    this._savingSub?.unsubscribe();
  }

  updateCourseStatus(playerId: string, value: string) {
    if (!!this._savingSub)
      return

    this._savingSub = this.playerService.updateCourseStatus$(playerId, value).subscribe((saved) => {
      if (!saved)
        alert('Ocurrió un problema al actualizar los datos');

      this._savingSub?.unsubscribe();
      this._savingSub = null;
    });
  }

  updatePlayerType(playerId: string, value: string) {
    if (!!this._savingSub)
      return

    this._savingSub = this.playerService.updatePlayerType$(playerId, value).subscribe((saved) => {
      if (!saved)
        alert('Ocurrió un problema al actualizar los datos');

      this._savingSub?.unsubscribe();
      this._savingSub = null;
    });
  }

  get isSaving(): boolean { return !!this._savingSub };
}
