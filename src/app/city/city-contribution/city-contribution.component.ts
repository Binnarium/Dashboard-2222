import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadContributionService: LoadContributionService,
    private readonly saveContributionService: SaveContributionService,
  ) { }


  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof ContributionDto, FormControl>>{
    theme: this.fb.control(null),
    allowIdea: this.fb.control(false),
    allowLecture: this.fb.control(false),
    allowProject: this.fb.control(false),
    explanation: this.fb.control(null),
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
        (this.form.controls[<keyof ContributionDto>'explanation'] as FormControl).setValue(contribution.explanation, { emitEvent: false });
      if (contribution?.theme)
        (this.form.controls[<keyof ContributionDto>'theme'] as FormControl).setValue(contribution.theme, { emitEvent: false });
      if (contribution?.allowIdea)
        (this.form.controls[<keyof ContributionDto>'allowIdea'] as FormControl).setValue(contribution.allowIdea, { emitEvent: false });
      if (contribution?.allowLecture)
        (this.form.controls[<keyof ContributionDto>'allowLecture'] as FormControl).setValue(contribution.allowLecture, { emitEvent: false });
      if (contribution?.allowProject)
        (this.form.controls[<keyof ContributionDto>'allowProject'] as FormControl).setValue(contribution.allowProject, { emitEvent: false });
    }
  );

  ngOnDestroy(): void {
    this.loadHistorySub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
