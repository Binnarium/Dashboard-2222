import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CityDto, CityEnabledPagesDto } from 'src/app/core/cities-module/city.dto';
import { ImageDTO } from 'src/app/shared/upload/asset.dto';
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
  public readonly form: FormGroup = this.fb.group(<Record<keyof CityDto, FormGroup>>{
    icon: this.fb.group(<Record<keyof ImageDTO, FormControl>>{
      height: this.fb.control(null),
      name: this.fb.control(null),
      path: this.fb.control(null),
      width: this.fb.control(null),
      url: this.fb.control(null),
    }),
    iconMap: this.fb.group(<Record<keyof ImageDTO, FormControl>>{
      height: this.fb.control(null),
      name: this.fb.control(null),
      path: this.fb.control(null),
      width: this.fb.control(null),
      url: this.fb.control(null),
    }),
    enabledPages: this.fb.group(<Record<keyof CityEnabledPagesDto, FormControl>>{
      activities: this.fb.control(true),
      questionary: this.fb.control(true),
      clubhouse: this.fb.control(true),
      project: this.fb.control(true),
      argumentation: this.fb.control(true),
      introductoryVideo: this.fb.control(true),
      resources: this.fb.control(true),
      projectVideo: this.fb.control(true),
    })
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load conf from database */
  private readonly configuration$: Observable<CityDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadCityConfigurationService.load$(cityId)),
    shareReplay(),
  );

  private configurationFormValue$: Observable<CityDto> = this.form.valueChanges.pipe(
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
      if (conf?.enabledPages) {
        const checkboxFields: Array<keyof CityEnabledPagesDto> = ['activities', 'project', 'questionary', 'clubhouse', 'argumentation', 'introductoryVideo', 'resources', 'projectVideo'];
        checkboxFields.forEach(field => this.enabledPagesControl.controls[field].setValue(conf.enabledPages![field] ?? false, { emitEvent: false })
        )
      }
      if (conf?.icon)
        this.iconControl.setValue(conf.icon, { emitEvent: false })
      if (conf?.iconMap)
        this.iconMapControl.setValue(conf.iconMap, { emitEvent: false })
    }
  );

  ngOnDestroy(): void {
    this.loadConfigurationSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadImage(image: ImageDTO): void {
    this.iconControl.setValue(image);
  }
  uploadImageMap(image: ImageDTO): void {
    this.iconMapControl.setValue(image);
  }

  get enabledPagesControl(): FormGroup {
    return this.form.controls[<keyof CityDto>'enabledPages'] as FormGroup;
  }

  get iconControl(): FormGroup {
    return this.form.controls[<keyof CityDto>'icon'] as FormGroup;
  }
  get iconMapControl(): FormGroup {
    return this.form.controls[<keyof CityDto>'iconMap'] as FormGroup;
  }
}
