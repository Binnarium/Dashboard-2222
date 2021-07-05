import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { HistoryDto } from './history.dto';
import { LoadHistoryService } from './load-history.service';
import { SaveHistoryService } from './save-history.service';

@Component({
  selector: 'dashboard-city-history',
  templateUrl: './city-history.component.html',
  styles: [
  ]
})
export class CityHistoryComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadHistoryService: LoadHistoryService,
    private readonly saveHistoryService: SaveHistoryService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group({
    content: this.fb.array([]),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly history$: Observable<HistoryDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadHistoryService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private historyForm$: Observable<HistoryDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.historyForm$])
    .pipe(
      switchMap(([cityId, history]) => this.saveHistoryService.save$(cityId, history)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadHistorySub: Subscription = this.history$.subscribe(
    // every time a new value comes, update the controls
    history => {
      const content = history?.content.map(content => {
        let newControl = null;
        if (content.kind === 'HISTORY#TITLE') newControl = this.fb.group({
          kind: 'HISTORY#TITLE',
          title: content.title ?? null,
        });
        else if (content.kind === 'HISTORY#IMAGE') newControl = this.fb.group({
          kind: 'HISTORY#IMAGE',
          imageUrl: content.imageUrl ?? null,
          reference: content.reference ?? null,
        });
        else newControl = this.fb.group({
          kind: 'HISTORY#TEXT',
          text: content.text ?? null,
        });
        return newControl
      }) ?? [];
      this.form.setControl('content', this.fb.array(content), { emitEvent: false });
    }
  );

  ngOnDestroy(): void {
    this.loadHistorySub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  get historyContent(): FormArray {
    return this.form.get('content') as FormArray;
  }
}
