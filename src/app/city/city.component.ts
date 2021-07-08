import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-city',
  template: `

  <div class="w-full h-full flex flex-row">
    <div class="sticky top-0 left-0 h-screen">
      <dashboard-cities-sidebar></dashboard-cities-sidebar>
    </div>

    <div class="flex-grow">
      <router-outlet></router-outlet>
    </div>
  </div>

  `,
})
export class CityComponent { }
