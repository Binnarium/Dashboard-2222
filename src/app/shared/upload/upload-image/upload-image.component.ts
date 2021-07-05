import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImageDTO } from '../asset.dto';
import { IUpload, UploadFileProgressDto } from '../i-upload';
import { UploadSingleFileService } from '../upload-single-file.service';

@Component({
  selector: 'dashboard-upload-image',
  templateUrl: './upload-image.component.html',
  providers: [
    { provide: IUpload, useClass: UploadSingleFileService }
  ]
})
export class UploadImageComponent implements OnDestroy {

  constructor(
    private readonly uploadService: IUpload,
  ) { }

  public image: ImageDTO | null = null;

  @Input('image')
  public set _image(file: ImageDTO | null) {
    this.image = file;
  }

  @Output()
  public completed: EventEmitter<ImageDTO> = new EventEmitter();

  public progress: UploadFileProgressDto | null = null;

  private uploadFileSubscription: Subscription | null = null;

  upload(event: any): void {
    const file = event.target.files.item(0);

    if (!file || !!this.progress || !!this.uploadFileSubscription)
      return;

    this.uploadFileSubscription = this.uploadService.upload$('uploads/image', file).pipe(
      finalize(() => {
        if (this.progress?.url) {
          const image: ImageDTO = {
            name: this.progress.name,
            path: this.progress.path,
            url: this.progress.url,
            height: 0,
            width: 0,
          };
          this.completed.emit(image);
        }

        this.uploadFileSubscription?.unsubscribe();
        this.uploadFileSubscription = null;
        this.progress = null;
      })
    ).subscribe(d => {
      this.progress = d;
    });
  }

  ngOnDestroy(): void {
    this.uploadFileSubscription?.unsubscribe();
  }
}
