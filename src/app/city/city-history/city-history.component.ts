import { Component, OnDestroy } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { ImageDTO } from 'src/app/shared/upload/asset.dto';
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
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadHistoryService: LoadHistoryService,
    private readonly saveHistoryService: SaveHistoryService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group({
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
          url: content.url ?? null,
          path: content.path ?? null,
          width: content.width ?? null,
          height: content.height ?? null,
          name: content.name ?? null,
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

  get historyContent(): UntypedFormArray {
    return this.form.get('content') as UntypedFormArray;
  }

  uploadImage(image: ImageDTO, index: number) {
    this.historyContent.controls[index].setValue({ ...image, kind: 'HISTORY#IMAGE' },);
  }
  public getDescriptionControl(index: number): UntypedFormControl {
    return (this.historyContent.controls[index] as UntypedFormGroup).controls['text'] as UntypedFormControl;
  }

  addTitle() {
    this.historyContent.push(this.fb.group({
      kind: 'HISTORY#TITLE',
      title: null,
    }));
  }
  addText() {

    this.historyContent.push(this.fb.group({
      kind: 'HISTORY#TEXT',
      text: null,
    }));
  }
  addImage() {
    this.historyContent.push(this.fb.group({
      kind: 'HISTORY#IMAGE',
      url: null,
      path: null,
      width: null,
      height: null,
      name: null,
    }));
  }
  deleteItem(index: number): void {
    this.historyContent.removeAt(index);
  }

}
