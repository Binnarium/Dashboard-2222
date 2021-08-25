import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CityDto } from 'src/app/core/cities-module/city.dto';
import { LoadCityConfigurationService } from '../city-configuration/load-city-configuration.service';
import { CityActivityDto } from './city-activity.dto';
import { LoadActivityService } from './load-activity.service';
import { SaveActivityService } from './save-activity.service';

@Component({
  selector: 'dashboard-city-activity',
  templateUrl: './city-activity.component.html',
  styles: [
  ]
})
export class CityActivityComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadActivityService: LoadActivityService,
    private readonly loadCityConfigurationService: LoadCityConfigurationService,
    private readonly saveActivityService: SaveActivityService,
  ) { }

  /** form so upload content */
  public readonly activityForm: FormGroup = this.fb.group(<Record<keyof CityActivityDto, FormControl>>{
    clubhouse: this.fb.control(null),
    project: this.fb.control(null),
    contribution: this.fb.control(null),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load conf from database */
  readonly configuration$: Observable<CityDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadCityConfigurationService.load$(cityId)),
    shareReplay(),
  );

  /** load introduction from database */
  private readonly activity$: Observable<CityActivityDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadActivityService.load$(cityId)),
    shareReplay(),
  );

  private activityForm$: Observable<CityActivityDto> = this.activityForm.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.activityForm$])
    .pipe(
      switchMap(([cityId, activity]) => this.saveActivityService.save$(cityId, activity)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadInscriptionSub: Subscription = this.activity$.subscribe(activity => {
    if (activity?.clubhouse)
      this.activityForm.controls[<keyof CityActivityDto>'clubhouse'].setValue(activity.clubhouse, { emitEvent: false });
    if (activity?.contribution)
      this.activityForm.controls[<keyof CityActivityDto>'contribution'].setValue(activity.contribution, { emitEvent: false });
    if (activity?.project)
      this.activityForm.controls[<keyof CityActivityDto>'project'].setValue(activity.project, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadInscriptionSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
