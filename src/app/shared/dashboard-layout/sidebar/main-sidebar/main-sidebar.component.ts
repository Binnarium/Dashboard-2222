import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadCitiesService } from 'src/app/core/cities-module/load-cities.service';

@Component({
  selector: 'dashboard-main-sidebar',
  templateUrl: './main-sidebar.component.html',
})
export class MainSidebarComponent {

  constructor(
    private readonly loadCitiesService: LoadCitiesService,
    private readonly route: ActivatedRoute,
  ) { }

  public activeCity$: Observable<string | null> = this.route.params.pipe(
    map(params => params.cityId ?? null),
    shareReplay(),
  );
  public readonly cities$ = this.loadCitiesService.cities$;
}
