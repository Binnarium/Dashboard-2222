import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from 'src/app/shared/upload/asset.dto';
import { CityFinalVideoDto } from './city-final-video.dto';
import { LoadFinalVideoService } from './load-final-video.service';
import { SaveFinalVideoService } from './save-final-video.service';

@Component({
  selector: 'dashboard-city-final-video',
  templateUrl: './city-final-video.component.html',
})
export class CityFinalVideoComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadFinalVideoService: LoadFinalVideoService,
    private readonly saveFinalVideoService: SaveFinalVideoService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CityFinalVideoDto, UntypedFormGroup>>{
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
  private readonly finalVideo$: Observable<CityFinalVideoDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadFinalVideoService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private finalVideoFormValue$: Observable<CityFinalVideoDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.finalVideoFormValue$])
    .pipe(
      switchMap(([cityId, finalVideo]) => this.saveFinalVideoService.save$(cityId, finalVideo)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadFinalVideoSub: Subscription = this.finalVideo$.subscribe(finalVideo => {
    // every time a new value comes, update the controls
    if (!!finalVideo?.video)
      this.form.controls[<keyof CityFinalVideoDto>'video'].setValue(finalVideo.video, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadFinalVideoSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls[<keyof CityFinalVideoDto>'video'].setValue(video);
  }
}
