import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from 'src/app/shared/upload/asset.dto';
import { CityThanksVideoDto } from './city-thanks-video.dto';
import { LoadThanksVideoService } from './load-thanks-video.service';
import { SaveThanksVideoService } from './save-thanks-video.service';

@Component({
  selector: 'dashboard-city-thanks-video',
  templateUrl: './city-thanks-video.component.html',
})
export class CityThanksVideoComponent implements OnDestroy {


  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadThanksVideoService: LoadThanksVideoService,
    private readonly saveThanksVideoService: SaveThanksVideoService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CityThanksVideoDto, UntypedFormGroup>>{
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

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly thanksVideo$: Observable<CityThanksVideoDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadThanksVideoService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private thanksVideoFormValue$: Observable<CityThanksVideoDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.thanksVideoFormValue$])
    .pipe(
      switchMap(([cityId, thanksVideo]) => this.saveThanksVideoService.save$(cityId, thanksVideo)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadThanksVideoSub: Subscription = this.thanksVideo$.subscribe(thanksVideo => {
    // every time a new value comes, update the controls
    if (!!thanksVideo?.video)
      this.form.controls[<keyof CityThanksVideoDto>'video'].setValue(thanksVideo.video, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadThanksVideoSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls[<keyof CityThanksVideoDto>'video'].setValue(video);
  }
}
