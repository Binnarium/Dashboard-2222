import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';
import { LoadPlayersService } from './load-player.service';
import { PlayerModel } from './player.model';

@Component({
  selector: 'dashboard-players',
  templateUrl: './players.component.html',
  styles: [
  ]
})
export class PlayersComponent {

  constructor(
    private readonly loadPlayerService: LoadPlayersService,
    private readonly route: ActivatedRoute,
  ) { }

  public readonly players$: Observable<Array<PlayerModel>> = this.route.queryParams.pipe(
    switchMapTo(this.loadPlayerService.getPlayers$()),
  );

}
