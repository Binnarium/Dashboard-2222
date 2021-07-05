import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { IntroductionDto } from './introduction.dto';
import { LoadIntroductionService } from './load-introduction.service';
import { SaveIntroductionService } from './save-introduction.service';

@Component({
  selector: 'dashboard-city-introduction',
  templateUrl: './city-introduction.component.html',
  styles: [
  ]
})
export class CityIntroductionComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadIntroductionService: LoadIntroductionService,
    private readonly saveIntroductionService: SaveIntroductionService,
  ) { }

  /** form so upload content */
  public readonly informationForm: FormGroup = this.fb.group({
    description: null,
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load introduction from database */
  private readonly introduction$: Observable<IntroductionDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadIntroductionService.load$(cityId)),
    shareReplay(),
  );

  private introductionForm$: Observable<IntroductionDto> = this.informationForm.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.introductionForm$])
    .pipe(
      switchMap(([cityId, introduction]) => this.saveIntroductionService.save$(cityId, introduction)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadInscriptionSub: Subscription = this.introduction$.subscribe(
    introduction => introduction ? this.informationForm.setValue(introduction, { emitEvent: false }) : null
  );

  ngOnDestroy(): void {
    this.loadInscriptionSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
