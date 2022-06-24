import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UploadAnyDocumentComponent } from './upload-any-document/upload-any-document.component';
import { UploadAudioComponent } from './upload-audio/upload-audio.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';



@NgModule({
  imports: [CommonModule],
  declarations: [UploadAnyDocumentComponent, UploadVideoComponent, UploadImageComponent, UploadDocumentComponent, UploadAudioComponent],
  exports: [UploadAnyDocumentComponent, UploadVideoComponent, UploadImageComponent, UploadDocumentComponent, UploadAudioComponent],

})
export class UploadModule { }
