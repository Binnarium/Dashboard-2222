import { Component, Input } from '@angular/core';

@Component({
  selector: 'a[dashboard-form-label-action],button[dashboard-form-label-action]',
  templateUrl: './form-label-action.component.html',
})
export class FormLabelActionComponent {
  @Input('class')
  inClass: string = 'bg-gray';
}
