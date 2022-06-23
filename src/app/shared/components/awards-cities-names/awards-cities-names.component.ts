import { Component, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
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
    this._awards.next(awards ?? []);
  }

  private _awards: BehaviorSubject<Array<AwardModel>> = new BehaviorSubject<Array<AwardModel>>([]);

  constructor(
    private readonly loadCitiesService: LoadCitiesService,
  ) { }

  citiesNames$: Observable<string | null> = combineLatest([
    this.loadCitiesService.cities$,
    this._awards.asObservable(),
  ]).pipe(
    map(([cities, awards]) => cities.filter(c => awards.some(a => a.cityId === c.id))),
    map(cities => cities.map(c => `${c.stage} ${c.name}`).join(', '))
  );
}
