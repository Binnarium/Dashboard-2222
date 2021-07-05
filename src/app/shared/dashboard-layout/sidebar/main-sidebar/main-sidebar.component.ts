import { Component } from '@angular/core';
import { LoadCitiesService } from 'src/app/core/cities-module/load-cities.service';

@Component({
  selector: 'dashboard-main-sidebar',
  templateUrl: './main-sidebar.component.html',
})
export class MainSidebarComponent {

  constructor(
    private readonly loadCitiesService: LoadCitiesService,
  ) { }

  public readonly cities$ = this.loadCitiesService.cities$;
}
