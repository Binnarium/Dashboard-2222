import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dashboard-cities-sidebar',
  templateUrl: './cities-sidebar.component.html',
})
export class CitiesSidebarComponent {

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  public readonly cityId$: Observable<string | null> = this.route.params.pipe(
    map(params => params.cityId ?? null),
  );

}
