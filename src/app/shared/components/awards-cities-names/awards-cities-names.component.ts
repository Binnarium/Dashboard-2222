import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadCitiesService } from 'src/app/core/cities-module/load-cities.service';
import { AwardModel } from 'src/app/players/player.model';

@Component({
  selector: 'dashboard-awards-cities-names',
  templateUrl: './awards-cities-names.component.html',
})
export class AwardsCitiesNamesComponent {

  @Input('awards')
  set setAwards(awards: Array<AwardModel> | null | undefined) {
    this._awards = awards ?? [];
  }

  private _awards: Array<AwardModel> = [];

  constructor(
    private readonly loadCitiesService: LoadCitiesService,
  ) { }

  citiesNames$: Observable<string | null> = this.loadCitiesService.cities$.pipe(
    map(cities => cities.filter(c => this._awards.some(a => a.cityId === c.id))),
    map(cities => cities.map(c => `${c.stage} ${c.name}`).join(', '))
  );
}
