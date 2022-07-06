import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { debounce, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ActivitiesDto } from './activities.dto';
import { LoadActivitiesService } from './load-activities.service';
import { SaveActivitiesService } from './save-activities.service';

@Component({
  selector: 'dashboard-activities',
  templateUrl: './activities.component.html',
  styles: [
  ]
})
export class ActivitiesComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly loadActivitiesService: LoadActivitiesService,
    private readonly saveActivitiesService: SaveActivitiesService,
  ) { }

  /** form so upload content */
  public readonly activitiesForm: UntypedFormGroup = this.fb.group(<Record<keyof ActivitiesDto, UntypedFormControl>>{
    clubhouse: this.fb.control(null),
    project: this.fb.control(null),
    contribution: this.fb.control(null),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** load introduction from database */
  private readonly activities$: Observable<ActivitiesDto | null> = this.loadActivitiesService.load$().pipe(
    shareReplay(),
  );

  private activitiesForm$: Observable<ActivitiesDto> = this.activitiesForm.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = this.activitiesForm$.pipe(
    switchMap(activity => this.saveActivitiesService.save$(activity)),
    tap(saved => this.saved = saved),
  ).subscribe();

  private readonly loadInscriptionSub: Subscription = this.activities$.subscribe(activities => {
    if (activities?.clubhouse)
      this.activitiesForm.controls[<keyof ActivitiesDto>'clubhouse'].setValue(activities.clubhouse, { emitEvent: false });
    if (activities?.contribution)
      this.activitiesForm.controls[<keyof ActivitiesDto>'contribution'].setValue(activities.contribution, { emitEvent: false });
    if (activities?.project)
      this.activitiesForm.controls[<keyof ActivitiesDto>'project'].setValue(activities.project, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadInscriptionSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
