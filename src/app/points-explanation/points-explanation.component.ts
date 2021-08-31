import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { debounce, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { LoadPointsExplanationService } from './load-points-explanation.service';
import { PointsExplanationDto } from './points-explanation.dto';
import { SavePointsExplanationService } from './save-points-explanation.service';

@Component({
  selector: 'dashboard-points-explanation',
  templateUrl: './points-explanation.component.html',
})
export class PointsExplanationComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly loadExplanationService: LoadPointsExplanationService,
    private readonly saveExplanationService: SavePointsExplanationService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof PointsExplanationDto, FormControl | FormGroup>>{
    explanation: this.fb.control(null),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** load from database */
  private readonly loadPointsExplanationSub: Subscription = this.loadExplanationService.load$.pipe(
    take(1),
    shareReplay(),
  ).subscribe(pointsExplanation => {
    if (pointsExplanation?.explanation)
      this.form.controls[<keyof PointsExplanationDto>'explanation']
        .setValue(pointsExplanation.explanation, { emitEvent: false });
  });

  private autoSaveSub: Subscription = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
    switchMap(pointsExplanation => this.saveExplanationService.save$(pointsExplanation)),
    tap(saved => this.saved = saved),
  ).subscribe();

  ngOnDestroy(): void {
    this.loadPointsExplanationSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
