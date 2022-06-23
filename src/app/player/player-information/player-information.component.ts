import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadPlayersService } from 'src/app/players/load-players.service';
import { PlayerModel } from 'src/app/players/player.model';

@Component({
  selector: 'dashboard-player-information',
  templateUrl: './player-information.component.html',
  styles: [
  ]
})
export class PlayerInformationComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly loadPlayerService: LoadPlayersService,
  ) { }

  public readonly player$: Observable<PlayerModel | null> = this.route.params.pipe(
    switchMap(params => this.loadPlayerService.getPlayer$(params.playerId)),
  );
}
