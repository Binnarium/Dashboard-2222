import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '../../../../assets/ckeditor5-build-classic/';

@Component({
  selector: 'dashboard-textarea',
  templateUrl: './textarea.component.html',
  styles: [
  ]
})
export class TextareaComponent implements OnInit {

  public readonly editor: any = ClassicEditor;

  private _control: FormControl | null = null;

  @ViewChild('editor') editorComponent!: CKEditorComponent;

  @Input('formControl')
  set control(formControl: FormControl) {
    this._control = formControl;
  }

  get control(): FormControl {
    if (!this._control)
      throw new Error("you need to share a form control");

    return this._control;
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(console.log);
  }

}
