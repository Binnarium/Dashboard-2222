import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';



@NgModule({
  imports: [CommonModule],
  declarations: [UploadVideoComponent, UploadImageComponent, UploadDocumentComponent],
  exports: [UploadVideoComponent, UploadImageComponent, UploadDocumentComponent],
})
export class UploadModule { }
