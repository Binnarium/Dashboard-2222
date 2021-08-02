import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '../../../../../packages/ckeditor5-build-classic/';

@Component({
  selector: 'dashboard-textarea',
  templateUrl: './textarea.component.html',
})
export class TextareaComponent implements OnInit {

  public readonly editor: any = ClassicEditor;

  private _control: AbstractControl | null = null;

  @ViewChild('editor') editorComponent!: CKEditorComponent;

  @Input('control')
  set control(formControl: AbstractControl) {
    this._control = formControl;
  }

  get control(): FormControl {
    if (!this._control)
      throw new Error("you need to share a form control");

    return this._control as FormControl;
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(console.log);
  }

}
