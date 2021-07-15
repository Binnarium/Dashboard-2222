import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CityConfigurationDto, CityConfigurationPagesDto } from './city-configuration.dto';
import { LoadCityConfigurationService } from './load-city-configuration.service';
import { SaveCityConfigurationService } from './save-city-configuration.service';

@Component({
  selector: 'dashboard-city-configuration',
  templateUrl: './city-configuration.component.html',
  styles: [
  ]
})
export class CityConfigurationComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadCityConfigurationService: LoadCityConfigurationService,
    private readonly saveCityConfigurationService: SaveCityConfigurationService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof CityConfigurationDto, FormGroup>>{
    enabledPages: this.fb.group(<Record<keyof CityConfigurationPagesDto, FormControl>>{
      activities: this.fb.control(true),
      questionary: this.fb.control(null),
      clubhouse: this.fb.control(null),
      project: this.fb.control(null),
    })
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load conf from database */
  private readonly configuration$: Observable<CityConfigurationDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadCityConfigurationService.load$(cityId)),
    shareReplay(),
  );

  private configurationFormValue$: Observable<CityConfigurationDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.configurationFormValue$])
    .pipe(
      switchMap(([cityId, conf]) => this.saveCityConfigurationService.save$(cityId, conf)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadConfigurationSub: Subscription = this.configuration$.subscribe(
    conf => {
      if (conf?.enabledPages)
        this.enabledPagesControl.setValue(conf.enabledPages, { emitEvent: false })
    }
  );

  ngOnDestroy(): void {
    this.loadConfigurationSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  get enabledPagesControl(): FormGroup {
    return this.form.controls[<keyof CityConfigurationDto>'enabledPages'] as FormGroup;
  }
}
