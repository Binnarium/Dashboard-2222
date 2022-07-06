import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadCityConfigurationService: LoadCityConfigurationService,
    private readonly saveCityConfigurationService: SaveCityConfigurationService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CityDto, UntypedFormGroup>>{
    icon: this.fb.group(<Record<keyof ImageDTO, UntypedFormControl>>{
      height: this.fb.control(null),
      name: this.fb.control(null),
      path: this.fb.control(null),
      width: this.fb.control(null),
      url: this.fb.control(null),
    }),
    iconMap: this.fb.group(<Record<keyof ImageDTO, UntypedFormControl>>{
      height: this.fb.control(null),
      name: this.fb.control(null),
      path: this.fb.control(null),
      width: this.fb.control(null),
      url: this.fb.control(null),
    }),
    enabledPages: this.fb.group(<Record<keyof CityEnabledPagesDto, UntypedFormControl>>{
      activities: this.fb.control(false),
      contribution: this.fb.control(false),
      content: this.fb.control(false),
      clubhouse: this.fb.control(false),
      clubhouseExplanation: this.fb.control(false),
      contributionExplanation: this.fb.control(false),
      project: this.fb.control(false),
      argumentation: this.fb.control(false),
      introductoryVideo: this.fb.control(false),
      resources: this.fb.control(false),
      projectVideo: this.fb.control(false),
      manualVideo: this.fb.control(false),
      microMesoMacro: this.fb.control(false),
      finalVideo: this.fb.control(false),
      marathon: this.fb.control(false),
      thanksVideo: this.fb.control(false),
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
        const checkboxFields: Array<keyof CityEnabledPagesDto> = [
          'activities', 'project', 'contribution', 'clubhouse',
          'argumentation', 'introductoryVideo', 'resources',
          'projectVideo', 'manualVideo', 'content', 'microMesoMacro',
          'finalVideo', 'clubhouseExplanation', 'contributionExplanation',
          'marathon', 'thanksVideo'
        ];
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

  get enabledPagesControl(): UntypedFormGroup {
    return this.form.controls[<keyof CityDto>'enabledPages'] as UntypedFormGroup;
  }

  get iconControl(): UntypedFormGroup {
    return this.form.controls[<keyof CityDto>'icon'] as UntypedFormGroup;
  }
  get iconMapControl(): UntypedFormGroup {
    return this.form.controls[<keyof CityDto>'iconMap'] as UntypedFormGroup;
  }
}
