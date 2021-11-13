import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';
import { PlayersTypes } from "../shared/data/players-types.data";
import { LoadPlayersService } from './load-player.service';
import { PlayerModel } from './player.model';
import { UpdateCourseStatusService } from './update-course-status.service';
import { UpdatePlayerTypeService } from './update-player-type.service';
import { UpdatePlayerWebAccessService } from './update-player-web-access.service';
@Component({
  selector: 'dashboard-players',
  templateUrl: './players.component.html',
  styles: [
  ]
})
export class PlayersComponent implements OnDestroy {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly loadPlayerService: LoadPlayersService,
    private readonly _updateCourseStatusService: UpdateCourseStatusService,
    private readonly _updatePlayerTypeService: UpdatePlayerTypeService,
    private readonly _updatePlayerWebAccessService: UpdatePlayerWebAccessService,
  ) { }

  private _savingSub: Subscription | null = null;

  public playersTypes: Array<string> = PlayersTypes;

  public readonly players$: Observable<Array<PlayerModel>> = this.route.queryParams.pipe(
    switchMapTo(this.loadPlayerService.getPlayers$()),
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


  get isSaving(): boolean { return !!this._savingSub };
}
