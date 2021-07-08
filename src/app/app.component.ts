import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-root',
  template: `
  <!-- make all the content fit in a full screen -->
  <main class="relative w-full min-h-screen bg-primary">
    <!-- make a vertical layout -->
    <div class="relative w-full h-full flex flex-row">

      <!-- make sidebar static -->
      <div class="sticky top-0 left-0 h-screen">
        <dashboard-main-sidebar></dashboard-main-sidebar>
      </div>

      <!-- main content -->
      <div class="flex-grow">
        <router-outlet></router-outlet>
      </div>
    </div>
  </main>
  `,
})
export class AppComponent { }
