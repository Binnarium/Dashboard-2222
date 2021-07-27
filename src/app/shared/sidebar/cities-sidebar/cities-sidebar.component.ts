import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CityDto } from 'src/app/core/cities-module/city.dto';
import { LoadCityService } from 'src/app/core/cities-module/load-city.service';

@Component({
  selector: 'dashboard-cities-sidebar',
  templateUrl: './cities-sidebar.component.html',
})
export class CitiesSidebarComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly loadCityService: LoadCityService,
  ) { }

  public readonly cityConf$: Observable<CityDto | null> = this.route.params.pipe(
    switchMap(params => this.loadCityService.city$(params.cityId)),
    map(city => city as CityDto ?? null),
  );
}
