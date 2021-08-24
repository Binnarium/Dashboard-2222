import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from 'src/app/shared/upload/asset.dto';
import { CityProjectVideoDto } from './city-project-video.dto';
import { LoadProjectVideoService } from './load-project-video.service';
import { SaveProjectVideoService } from './save-project-video.service';

@Component({
  selector: 'dashboard-city-project-video',
  templateUrl: './city-project-video.component.html',
})
export class CityIntroductoryVideoComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadProjectVideoService: LoadProjectVideoService,
    private readonly saveProjectVideoService: SaveProjectVideoService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof CityProjectVideoDto, FormGroup>>{
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
  private readonly projectVideo$: Observable<CityProjectVideoDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadProjectVideoService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private projectVideoFormValue$: Observable<CityProjectVideoDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.projectVideoFormValue$])
    .pipe(
      switchMap(([cityId, projectVideo]) => this.saveProjectVideoService.save$(cityId, projectVideo)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadProjectVideoSub: Subscription = this.projectVideo$.subscribe(projectVideo => {
    // every time a new value comes, update the controls
    if (!!projectVideo?.video)
      this.form.controls[<keyof CityProjectVideoDto>'video'].setValue(projectVideo.video, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadProjectVideoSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls[<keyof CityProjectVideoDto>'video'].setValue(video);
  }
}
