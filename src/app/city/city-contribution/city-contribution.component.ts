import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { ContributionDto } from './contribution.dto';
import { LoadContributionService } from './load-contribution.service';
import { SaveContributionService } from './save-contribution.service';

@Component({
  selector: 'dashboard-city-contribution',
  templateUrl: './city-contribution.component.html',
})
export class CityContributionComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadContributionService: LoadContributionService,
    private readonly saveContributionService: SaveContributionService,
  ) { }


  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof ContributionDto, UntypedFormControl>>{
    pubUrl: this.fb.control(null),
    explanation: this.fb.control(null),
    teachingPractice: this.fb.control(null),
    educativeEducations: this.fb.control(null),
    governmentManagement: this.fb.control(null),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly contribution$: Observable<ContributionDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadContributionService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private contributionFormValue$: Observable<ContributionDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.contributionFormValue$])
    .pipe(
      switchMap(([cityId, contribution]) => this.saveContributionService.save$(cityId, contribution)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadHistorySub: Subscription = this.contribution$.subscribe(
    // every time a new value comes, update the controls
    contribution => {
      if (contribution?.explanation)
        (this.form.controls[<keyof ContributionDto>'explanation'] as UntypedFormControl).setValue(contribution.explanation, { emitEvent: false });
      if (contribution?.pubUrl)
        (this.form.controls[<keyof ContributionDto>'pubUrl'] as UntypedFormControl).setValue(contribution.pubUrl, { emitEvent: false });
      if (contribution?.teachingPractice)
        (this.form.controls[<keyof ContributionDto>'teachingPractice'] as UntypedFormControl).setValue(contribution.teachingPractice, { emitEvent: false });
      if (contribution?.educativeEducations)
        (this.form.controls[<keyof ContributionDto>'educativeEducations'] as UntypedFormControl).setValue(contribution.educativeEducations, { emitEvent: false });
      if (contribution?.governmentManagement)
        (this.form.controls[<keyof ContributionDto>'governmentManagement'] as UntypedFormControl).setValue(contribution.governmentManagement, { emitEvent: false });
    }
  );

  ngOnDestroy(): void {
    this.loadHistorySub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
