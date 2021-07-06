import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { LoadCityService } from 'src/app/core/cities-module/load-city.service';

@Component({
  selector: 'dashboard-city-home',
  templateUrl: './city-home.component.html',
  styles: [
  ]
})
export class CityHomeComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly loadCityService: LoadCityService,
  ) { }


  public city$ = this.route.params.pipe(
    map(params => params!.cityId as string),
    switchMap(cityId => this.loadCityService.city$(cityId)),
  )

}
