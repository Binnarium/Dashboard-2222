import { Component, OnDestroy } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { CityArgumentDto } from './city-argument.dto';
import { LoadArgumentService } from './load-argument.service';
import { SaveArgumentService } from './save-argument.service';

@Component({
  selector: 'dashboard-city-argument',
  templateUrl: './city-argument.component.html',
  styles: [
  ]
})
export class CityArgumentComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadArgumentService: LoadArgumentService,
    private readonly saveArgumentService: SaveArgumentService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CityArgumentDto, UntypedFormArray>>{
    questions: this.fb.array([]),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly argument$: Observable<CityArgumentDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadArgumentService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private argumentForm$: Observable<CityArgumentDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.argumentForm$])
    .pipe(
      switchMap(([cityId, argument]) => this.saveArgumentService.save$(cityId, argument)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadArgumentSub: Subscription = this.argument$.subscribe(argument => {
    // every time a new value comes, update the controls
    const questionsFormArray = argument?.questions?.map(question => this.fb.control(question ?? null))
      ?? [
        this.fb.control(null),
        this.fb.control(null),
        this.fb.control(null),
      ];
    this.form.setControl(<keyof CityArgumentDto>'questions', this.fb.array(questionsFormArray), { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadArgumentSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  get questionsArray(): UntypedFormArray {
    return this.form.controls['questions'] as UntypedFormArray;
  }

  addQuestion(): void {
    const questionsArray = this.questionsArray;
    if (questionsArray.length >= 5) {
      alert('No se puede tener más de 5 preguntas');
      return;
    }

    this.questionsArray.push(this.fb.control(null));
  }
  removeQuestion(): void {
    const questionsArray = this.questionsArray;
    if (questionsArray.length <= 3) {
      alert('No se puede tener menos de 3 preguntas');
      return;
    }
    this.questionsArray.removeAt(questionsArray.length - 1);

  }
}
