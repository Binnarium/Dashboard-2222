import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CityConfigurationDto } from 'src/app/city/city-configuration/city-configuration.dto';
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

  public readonly cityConf$: Observable<CityConfigurationDto | null> = this.route.params.pipe(
    switchMap(params => this.loadCityService.city$(params.cityId)),
    map(city => city as CityConfigurationDto ?? null),
  );
}
