import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { VideoDTO } from '../asset.dto';
import { IUpload, UploadFileProgressDto } from '../i-upload';
import { UploadSingleFileService } from '../upload-single-file.service';
import { BetterVideoModel } from './better-video.model';
import { LoadBetterVideoService } from './load-better-video.service';
import { TranscodeVideoService } from './transcode-video.service';

@Component({
  selector: 'dashboard-upload-video',
  templateUrl: './upload-video.component.html',
  providers: [
    { provide: IUpload, useClass: UploadSingleFileService },
    LoadBetterVideoService,
    TranscodeVideoService,
  ]
})
export class UploadVideoComponent implements OnDestroy {

  constructor(
    private readonly uploadService: IUpload,
    private readonly loadBetterVideo: LoadBetterVideoService,
    private readonly transcodeVideoService: TranscodeVideoService,
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
  private transcodeSub: Subscription | null = null;

  ngOnDestroy(): void {
    this.uploadFileSubscription?.unsubscribe();
    this.transcodeSub?.unsubscribe();
  }

  transcode() {
    if (!!this.transcodeSub)
      return;
    if (!!this.video?.path)
      this.transcodeSub = this.transcodeVideoService.transcode$(this.video?.path).subscribe(transcoding => {
        const msg = transcoding ? 'El video se va a procesar, puede tomar unos minutos' : 'Ocurrio un problema, vuelve a intentarlo';

        alert(msg);

        this.transcodeSub?.unsubscribe();
        this.transcodeSub = null;
      });
  }

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

}
