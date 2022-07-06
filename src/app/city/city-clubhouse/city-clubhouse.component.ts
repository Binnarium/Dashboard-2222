import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { ClubhouseDto } from './clubhouse.dto';
import { LoadClubhouseService } from './load-clubhouse.service';
import { SaveClubhouseService } from './save-clubhouse.service';

@Component({
  selector: 'dashboard-city-clubhouse',
  templateUrl: './city-clubhouse.component.html',
})
export class CityClubhouseComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadClubhouseService: LoadClubhouseService,
    private readonly saveClubhouseService: SaveClubhouseService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof ClubhouseDto, UntypedFormControl>>{
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly clubhouse$: Observable<ClubhouseDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadClubhouseService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private clubhouseFormValue$: Observable<ClubhouseDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.clubhouseFormValue$])
    .pipe(
      switchMap(([cityId, clubhouse]) => this.saveClubhouseService.save$(cityId, clubhouse)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadClubhouseSub: Subscription = this.clubhouse$.subscribe(
    // every time a new value comes, update the controls
    contribution => {
    }
  );

  ngOnDestroy(): void {
    this.loadClubhouseSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
