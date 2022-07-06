import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { debounce, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { LoadTeamService } from './load-team.service';
import { SaveTeamService } from './save-team.service';
import { TeamDto } from './team.dto';

@Component({
  selector: 'dashboard-welcome',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly loadTeamService: LoadTeamService,
    private readonly saveTeamService: SaveTeamService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof TeamDto, UntypedFormControl | UntypedFormGroup>>{
    teamText: this.fb.control(null),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** load from database */
  private readonly loadTeamSub: Subscription = this.loadTeamService.load$.pipe(
    take(1),
    shareReplay(),
  ).subscribe(team => {
    if (team?.teamText)
      this.form.controls[<keyof TeamDto>'teamText'].setValue(team.teamText, { emitEvent: false });
  });

  private autoSaveSub: Subscription = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
    switchMap(team => this.saveTeamService.save$(team)),
    tap(saved => this.saved = saved),
  ).subscribe();

  ngOnDestroy(): void {
    this.loadTeamSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
}
