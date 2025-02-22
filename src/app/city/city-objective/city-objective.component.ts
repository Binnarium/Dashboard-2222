import { Component, OnDestroy } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { LoadAllValidCompetencesService } from './load-all-valid-competences.service';
import { LoadObjectiveService } from './load-objective.service';
import { ObjectiveDto } from './objective.dto';
import { SaveObjectiveService } from './save-objective.service';

@Component({
  selector: 'dashboard-city-objective',
  templateUrl: './city-objective.component.html',
  styles: [
  ]
})
export class CityObjectiveComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadObjectiveService: LoadObjectiveService,
    private readonly saveObjectiveService: SaveObjectiveService,
    private readonly loadAllValidCompetencesService: LoadAllValidCompetencesService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof ObjectiveDto, UntypedFormControl | UntypedFormArray | UntypedFormGroup>>{
    mainObjective: this.fb.control(null),
    competences: this.fb.group({}),
    ideas: this.fb.array([]),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  public readonly competences$ = this.loadAllValidCompetencesService.load$.pipe(
    take(1)
  );

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly objective$: Observable<ObjectiveDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadObjectiveService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private objectiveForm$: Observable<ObjectiveDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.objectiveForm$])
    .pipe(
      switchMap(([cityId, argument]) => this.saveObjectiveService.save$(cityId, argument)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadObjectiveSub: Subscription = combineLatest([this.objective$, this.competences$])
    .pipe(
      take(1),
    )
    .subscribe(([objective, competences]) => {
      // set main objective
      if (!!objective?.mainObjective)
        this.form.controls[<keyof ObjectiveDto>'mainObjective'].setValue(objective.mainObjective, { emitEvent: false });

      // load ideas
      const ideasFormArray = objective?.ideas?.map(idea => this.fb.control(idea ?? null))
        ?? [
          this.fb.control(null),
        ];
      this.form.setControl(<keyof ObjectiveDto>'ideas', this.fb.array(ideasFormArray), { emitEvent: false });

      // load competences
      competences.forEach(c => {
        this.competencesGroup.addControl(c.id, this.fb.control(objective?.competences?.[c.id] ?? false), { emitEvent: false });
      });
    });

  ngOnDestroy(): void {
    this.loadObjectiveSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  get ideasArray(): UntypedFormArray {
    return this.form.controls[<keyof ObjectiveDto>'ideas'] as UntypedFormArray;
  }

  get competencesGroup(): UntypedFormGroup {
    return this.form.controls[<keyof ObjectiveDto>'competences'] as UntypedFormGroup;
  }

  addIdeas(): void {
    const ideasArray = this.ideasArray;
    if (ideasArray.length >= 2) {
      alert('No se puede tener más de dos ideas para desaprender');
      return;
    }

    this.ideasArray.push(this.fb.control(null));
  }

  removeIdeas(): void {
    const ideasArray = this.ideasArray;
    if (ideasArray.length <= 1) {
      alert('Se debe tener al menos una idea para desaprender');
      return;
    }
    this.ideasArray.removeAt(ideasArray.length - 1);
  }
}
