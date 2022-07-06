import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from 'src/app/shared/upload/asset.dto';
import { CityIntroductoryVideoDto } from './city-introductory-video.dto';
import { LoadIntroductoryVideoService } from './load-introductory-video.service';
import { SaveIntroductoryVideoService } from './save-introductory-video.service';

@Component({
  selector: 'dashboard-city-introductory-video',
  templateUrl: './city-introductory-video.component.html',
})
export class CityIntroductoryVideoComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadIntroductoryVideoService: LoadIntroductoryVideoService,
    private readonly saveIntroductoryVideoService: SaveIntroductoryVideoService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CityIntroductoryVideoDto, UntypedFormGroup>>{
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
  private readonly introductoryVideo$: Observable<CityIntroductoryVideoDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadIntroductoryVideoService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private introductoryVideoFormValue$: Observable<CityIntroductoryVideoDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.introductoryVideoFormValue$])
    .pipe(
      switchMap(([cityId, introductoryVideo]) => this.saveIntroductoryVideoService.save$(cityId, introductoryVideo)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadIntroductoryVideoSub: Subscription = this.introductoryVideo$.subscribe(introductoryVideo => {
    // every time a new value comes, update the controls
    if (!!introductoryVideo?.video)
      this.form.controls[<keyof CityIntroductoryVideoDto>'video'].setValue(introductoryVideo.video, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadIntroductoryVideoSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls[<keyof CityIntroductoryVideoDto>'video'].setValue(video);
  }
}
