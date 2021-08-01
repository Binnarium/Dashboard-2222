import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CKEditor5, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';


@Component({
  selector: 'dashboard-textarea',
  templateUrl: './textarea.component.html',
  styles: [
  ]
})
export class TextareaComponent implements OnInit {

  constructor() { }

  public readonly editor: any = ClassicEditor;

  private _control: FormControl | null = null;

  @ViewChild('editor') editorComponent!: CKEditorComponent;


  public readonly editorConf: CKEditor5.Config = {
    toolbar: ['heading', '|', 'bold', 'italic'],
    // plugins: [Markdown],
    language: 'es'
  };

  @Input('formControl')
  set control(formControl: FormControl) {
    this._control = formControl;
  }

  get control(): FormControl {
    if (!this._control)
      throw new Error("");

    return this._control;
  }



  ngOnInit(): void {
  }

}
