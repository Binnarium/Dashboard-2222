import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AudioDto } from '../asset.dto';
import { IUpload, UploadFileProgressDto } from '../i-upload';
import { UploadSingleFileService } from '../upload-single-file.service';

@Component({
  selector: 'dashboard-upload-audio',
  templateUrl: './upload-audio.component.html',
  providers: [
    { provide: IUpload, useClass: UploadSingleFileService }
  ]
})
export class UploadAudioComponent implements OnDestroy {

  constructor(
    private readonly uploadService: IUpload,
  ) { }

  public audio: AudioDto | null = null;

  @Input('audio')
  public set _audio(file: AudioDto | null) {
    this.audio = file;
  }

  @Output()
  public completed: EventEmitter<NonNullable<AudioDto>> = new EventEmitter();

  public progress: UploadFileProgressDto | null = null;

  private uploadFileSubscription: Subscription | null = null;

  upload(event: any): void {
    const file = event.target.files.item(0);

    if (!file || !!this.progress || !!this.uploadFileSubscription)
      return;

    this.uploadFileSubscription = this.uploadService.upload$('uploads/audio', file).pipe(
      finalize(() => {
        if (this.progress?.url) {
          const audio: NonNullable<AudioDto> = {
            name: this.progress.name,
            path: this.progress.path,
            url: this.progress.url,
            duration: 0,
            format: null
          };
          this.completed.emit(audio);
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
