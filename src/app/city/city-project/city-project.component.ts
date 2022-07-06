import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { AudioDto } from 'src/app/shared/upload/asset.dto';
import { LoadProjectService } from './load-project.service';
import { ProjectDto } from './project.dto';
import { SaveProjectService } from './project.service';

@Component({
  selector: 'dashboard-city-project',
  templateUrl: './city-project.component.html',
  styles: [
  ]
})
export class CityProjectComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadProjectService: LoadProjectService,
    private readonly saveProjectService: SaveProjectService,
  ) { }


  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof ProjectDto, UntypedFormControl | UntypedFormGroup>>{
    activity: this.fb.control(null),
    explanation: this.fb.control(null),
    allow: this.fb.control(<ProjectDto['allow']>'ALLOW#NONE'),
    audio: this.fb.group(<Record<keyof AudioDto, UntypedFormControl>>{
      duration: this.fb.control(null),
      format: this.fb.control(null),
      name: this.fb.control(null),
      path: this.fb.control(null),
      url: this.fb.control(null),
    }),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly project$: Observable<ProjectDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadProjectService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private projectFormValue$: Observable<ProjectDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.projectFormValue$])
    .pipe(
      switchMap(([cityId, project]) => this.saveProjectService.save$(cityId, project)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadHistorySub: Subscription = this.project$.subscribe(
    // every time a new value comes, update the controls
    project => {
      if (project?.activity)
        (this.form.controls[<keyof ProjectDto>'activity'] as UntypedFormControl).setValue(project.activity, { emitEvent: false });
      if (project?.explanation)
        (this.form.controls[<keyof ProjectDto>'explanation'] as UntypedFormControl).setValue(project.explanation, { emitEvent: false });
      if (project?.allow)
        (this.form.controls[<keyof ProjectDto>'allow'] as UntypedFormControl).setValue(project.allow, { emitEvent: false });
      if (project?.audio)
        (this.form.controls[<keyof ProjectDto>'audio'] as UntypedFormGroup).setValue(project.audio, { emitEvent: false });
    }
  );

  ngOnDestroy(): void {
    this.loadHistorySub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  get projectAudioControl(): UntypedFormGroup {
    return this.form.get(<keyof ProjectDto>'audio') as UntypedFormGroup;
  }

  uploadAudio(audio: AudioDto,) {
    this.projectAudioControl.setValue(audio);
  }
}
