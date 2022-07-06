import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from 'src/app/shared/upload/asset.dto';
import { CityManualVideoDto } from './city-manual-video.dto';
import { LoadManualVideoService } from './load-manual-video.service';
import { SaveManualVideoService } from './save-manual-video.service';

@Component({
  selector: 'dashboard-city-manual-video',
  templateUrl: './city-manual-video.component.html',
})
export class CityManualVideoComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadManualVideoService: LoadManualVideoService,
    private readonly saveManualVideoService: SaveManualVideoService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CityManualVideoDto, UntypedFormGroup | UntypedFormControl>>{
    video: this.fb.group(<VideoDTO>{
      duration: null,
      format: null,
      name: null,
      path: null,
      url: null,
    }),
    link: this.fb.control(null),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly manualVideo$: Observable<CityManualVideoDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadManualVideoService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private manualVideoFormValue$: Observable<CityManualVideoDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.manualVideoFormValue$])
    .pipe(
      switchMap(([cityId, manualVideo]) => this.saveManualVideoService.save$(cityId, manualVideo)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadManualVideoSub: Subscription = this.manualVideo$.subscribe(manualVideo => {
    // every time a new value comes, update the controls
    if (!!manualVideo?.video)
      this.form.controls[<keyof CityManualVideoDto>'video'].setValue(manualVideo.video, { emitEvent: false });
    if (!!manualVideo?.link)
      this.form.controls[<keyof CityManualVideoDto>'link'].setValue(manualVideo.link, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadManualVideoSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls[<keyof CityManualVideoDto>'video'].setValue(video);
  }
}
