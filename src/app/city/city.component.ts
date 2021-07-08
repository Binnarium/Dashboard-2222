import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CityColorService } from '../core/cities-module/city-color.service';

@Component({
  selector: 'dashboard-city',
  template: `

  <div class="w-full h-full flex flex-row">
    <div class="sticky top-0 left-0 h-screen">
      <dashboard-cities-sidebar></dashboard-cities-sidebar>
    </div>

    <div class="flex-grow" [ngStyle]="{'background-color': cityColor$|async}">
      <router-outlet></router-outlet>
    </div>
  </div>

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
