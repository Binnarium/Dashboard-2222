import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { CityColorService } from 'src/app/core/cities-module/city-color.service';

@Component({
  selector: 'dashboard-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cityColorService: CityColorService,
  ) { }

  readonly cityColor$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string),
    switchMap(cityId => this.cityColorService.color$(cityId)),
    map(color => color ? `#${color}` : 'inherit'),
    shareReplay(1),
  );

}
