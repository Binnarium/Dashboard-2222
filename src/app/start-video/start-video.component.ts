import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { debounce, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from 'src/app/shared/upload/asset.dto';
import { LoadStartVideoService } from './load-start-video.service';
import { SaveStartVideoService } from './save-start-video.service';
import { StartVideoDto } from './start-video.dto';

@Component({
  selector: 'dashboard-start-video',
  templateUrl: './start-video.component.html',
})
export class StartVideoComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly loadProjectVideoService: LoadStartVideoService,
    private readonly saveProjectVideoService: SaveStartVideoService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof StartVideoDto, FormGroup>>{
    video: this.fb.group(<VideoDTO>{
      duration: null,
      format: null,
      name: null,
      path: null,
      url: null,
    })
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** load from database */
  private readonly startVideo$: Observable<StartVideoDto | null> = this.loadProjectVideoService.load$().pipe(
    take(1),
    shareReplay(),
  );

  private startVideoFormValue$: Observable<StartVideoDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = this.startVideoFormValue$
    .pipe(
      switchMap(startVideo => this.saveProjectVideoService.save$(startVideo)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadStartVideoSub: Subscription = this.startVideo$.subscribe(startVideo => {
    // every time a new value comes, update the controls
    if (!!startVideo?.video)
      this.form.controls[<keyof StartVideoDto>'video'].setValue(startVideo.video, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadStartVideoSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls[<keyof StartVideoDto>'video'].setValue(video);
  }
}
