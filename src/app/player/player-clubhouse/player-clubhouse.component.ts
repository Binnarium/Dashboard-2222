import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { LoadCitiesService } from 'src/app/core/cities-module/load-cities.service';
import { PlayerClubhouseModel, PlayerClubhouseService } from './player-clubhouse.service';

@Component({
  selector: 'dashboard-player-clubhouse',
  templateUrl: './player-clubhouse.component.html',
})
export class PlayerClubhouseComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly playerClubhouseService: PlayerClubhouseService,
    private readonly loadCitiesService: LoadCitiesService,
  ) { }

  public readonly clubhouses$ = this.route.params.pipe(
    switchMap(params => this.playerClubhouseService.all$(params.playerId)),
  );

  private taskSub: Subscription | null = null;

  delete(clubhouse: PlayerClubhouseModel) {
    if (!!this.taskSub)
      return;

    const confirmation = confirm(`Quieres eliminar el Clubhouse ${clubhouse.name ?? '** Sin nombre'}`)

    if (!confirmation)
      return;

    this.taskSub = this.route.params.pipe(
      take(1),
      switchMap(params => this.playerClubhouseService.delete$(params.playerId, clubhouse.id)),
    ).subscribe(deleted => {
      if (!deleted) alert('No se pudo eliminar el Clubhouse')

      this.taskSub?.unsubscribe();
      this.taskSub = null;
    });
  }

  async create() {
    if (!!this.taskSub)
      return;

    console.log('FIXME: remove to promise')
    const cities = await this.loadCitiesService.cities$.pipe(take(1)).toPromise() ?? [];

    const url = prompt(`Ingresa la Url del clubhouse`) ?? null;

    if (url === null || url.length < 5)
      return;

    const citiesIds = cities
      .filter(c => c.enabledPages?.clubhouse)
      .map(c => `${c.stage} "${c.id}"`)
      .join(', ');

    const cityId = prompt(`Ingresa id de la ciudad: ${citiesIds}`) ?? null;

    if (cityId == null || cityId.length < 5)
      return;

    this.taskSub = this.route.params.pipe(
      take(1),
      switchMap(params => this.playerClubhouseService.createNew$(params.playerId, cityId, url)),
    ).subscribe(deleted => {
      if (!deleted) alert('No se pudo crear el Clubhouse')

      this.taskSub?.unsubscribe();
      this.taskSub = null;
    });
  }
}
