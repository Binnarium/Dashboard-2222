import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PlayerService } from 'src/app/core/services/player.service';
import { PlayerModel } from 'src/app/players/player.model';

@Component({
  selector: 'dashboard-player-sidebar',
  templateUrl: './player-sidebar.component.html'
})
export class PlayerSidebarComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly playerService: PlayerService,
  ) { }

  public readonly player$: Observable<PlayerModel | null> = this.route.params.pipe(
    switchMap(params => this.playerService.getPlayer$(params.playerId)),
  );
}
