import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'dashboard-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent {

  constructor(
    private readonly el: ElementRef<HTMLElement>,
  ) {
    if (el.nativeElement.hasAttribute('wide'))
      this.wideContainer = true;
  }

  wideContainer: boolean = false;

}
