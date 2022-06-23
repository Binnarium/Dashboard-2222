import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CityColorService } from '../core/cities-module/city-color.service';

@Component({
  selector: 'dashboard-city',
  template: `

  

  `,
})
export class CityComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly cityColorService: CityColorService,
  ) { }

  readonly cityColor$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string),
    switchMap(cityId => this.cityColorService.color$(cityId)),
    map(color => color ? `#${color}` : 'inherit')
  );
}
