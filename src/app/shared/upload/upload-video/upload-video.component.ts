import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { VideoDTO } from '../asset.dto';
import { IUpload, UploadFileProgressDto } from '../i-upload';
import { UploadSingleFileService } from '../upload-single-file.service';
import { BetterVideoModel } from './better-video.model';
import { LoadBetterVideoService } from './load-better-video.service';

@Component({
  selector: 'dashboard-upload-video',
  templateUrl: './upload-video.component.html',
  providers: [
    { provide: IUpload, useClass: UploadSingleFileService },
    LoadBetterVideoService,
  ]
})
export class UploadVideoComponent implements OnDestroy {

  constructor(
    private readonly uploadService: IUpload,
    private readonly loadBetterVideo: LoadBetterVideoService,
  ) { }

  public video: VideoDTO | null = null;

  @Input('video')
  public set _video(file: VideoDTO | null) {
    this.video = file;

    /// update reference to new uploaded video
    if (!!this.video)
      this.betterVideo$ = this.loadBetterVideo.load$(this.video);
  }

  public betterVideo$: Observable<BetterVideoModel | null> | null = null;

  @Output()
  public completed: EventEmitter<NonNullable<VideoDTO>> = new EventEmitter();

  public progress: UploadFileProgressDto | null = null;

  private uploadFileSubscription: Subscription | null = null;

  upload(event: any): void {
    const file = event.target.files.item(0);

    if (!file || !!this.progress || !!this.uploadFileSubscription)
      return;

    this.uploadFileSubscription = this.uploadService.upload$('uploads/video', file).pipe(
      finalize(() => {
        if (this.progress?.url) {
          const video: NonNullable<VideoDTO> = {
            name: this.progress.name,
            path: this.progress.path,
            url: this.progress.url,
            duration: 0,
            format: null
          };
          this.completed.emit(video);
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
