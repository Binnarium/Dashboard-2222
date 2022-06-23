import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { LoadCitiesService } from 'src/app/core/cities-module/load-cities.service';
import { PlayerProjectModel, PlayerProjectService } from './player-clubhouse.service';

@Component({
  selector: 'dashboard-player-project',
  templateUrl: './player-project.component.html',
  styles: [
  ]
})
export class PlayerProjectComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly playerProjectService: PlayerProjectService,
  ) { }

  public readonly projectFiles$ = this.route.params.pipe(
    switchMap(params => this.playerProjectService.all$(params.playerId)),
  );

  private taskSub: Subscription | null = null;

  delete(project: PlayerProjectModel) {
    if (!!this.taskSub)
      return;
    const split = project.file.path.split('/');
    const confirmation = confirm(`Quieres eliminar el Archivo: ${split[split.length - 1]}`)

    if (!confirmation)
      return;

    this.taskSub = this.route.params.pipe(
      take(1),
      switchMap(params => this.playerProjectService.delete$(params.playerId, project.id)),
    ).subscribe(deleted => {
      if (!deleted) alert('No se pudo eliminar el Clubhouse')

      this.taskSub?.unsubscribe();
      this.taskSub = null;
    });
  }
}
