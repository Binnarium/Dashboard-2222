import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-player',
  template: `
  <div class="w-full h-full flex flex-row">
    <div class="sticky top-0 left-0 h-screen">
      <dashboard-player-sidebar></dashboard-player-sidebar>
    </div>

    <div class="flex-grow">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
