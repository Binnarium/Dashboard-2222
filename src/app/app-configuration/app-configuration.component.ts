import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { AppConfigurationDto } from './app-configuration.dto';
import { LoadAppConfigurationService } from './load-app-configuration.service';
import { SaveAppConfigurationService } from './save-app-configuration.service';

@Component({
  selector: 'dashboard-app-configuration',
  templateUrl: './app-configuration.component.html',
  styles: [
  ]
})
export class AppConfigurationComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly loadAppConfigurationService: LoadAppConfigurationService,
    private readonly saveAppConfigurationService: SaveAppConfigurationService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof AppConfigurationDto, FormControl>>{
    courseFinalizationDate: this.fb.control(null),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** load from database */
  private readonly configuration$: Observable<AppConfigurationDto | null> = this.loadAppConfigurationService.load$.pipe(
    take(1),
    shareReplay(),
  );

  private configurationFormValue$: Observable<AppConfigurationDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
    map<Record<keyof AppConfigurationDto, string>, AppConfigurationDto>(val => <AppConfigurationDto>{
      courseFinalizationDate: new Date(val.courseFinalizationDate
      )
    }),
  );

  private autoSaveSub: Subscription = this.configurationFormValue$.pipe(
    switchMap(conf => this.saveAppConfigurationService.save$(conf)),
    tap(saved => this.saved = saved),
  ).subscribe();

  private readonly loadAppConfigurationSub: Subscription = this.configuration$.subscribe(conf => {
    if (conf?.courseFinalizationDate) {
      const dateVal = conf.courseFinalizationDate.toISOString().split('T')[0];
      this.form.controls[<keyof AppConfigurationDto>'courseFinalizationDate'].setValue(dateVal, { emitEvent: false });
    }
  });

  ngOnDestroy(): void {
    this.loadAppConfigurationSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
