import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { debounce, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from '../shared/upload/asset.dto';
import { ContributionExplanationDto } from './contribution-explanation.dto';
import { LoadContributionExplanationService } from './load-contribution-explanation.service';
import { SaveContributionExplanationService } from './save-contribution-explanation.service';

@Component({
  selector: 'dashboard-Contribution-explanation',
  templateUrl: './contribution-explanation.component.html',
})
export class ContributionExplanationComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly loadExplanationService: LoadContributionExplanationService,
    private readonly saveExplanationService: SaveContributionExplanationService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof ContributionExplanationDto, FormControl | FormGroup>>{
    explanation: this.fb.control(null),
    manifestUrl: this.fb.control(null),
    video: this.fb.group(<Record<keyof VideoDTO, FormControl>>{
      duration: this.fb.control(null),
      format: this.fb.control(null),
      name: this.fb.control(null),
      path: this.fb.control(null),
      url: this.fb.control(null),
    }),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** load from database */
  private readonly loadContributionExplanationSub: Subscription = this.loadExplanationService.load$.pipe(
    take(1),
    shareReplay(),
  ).subscribe(explanation => {
    if (explanation?.explanation)
      this.form.controls[<keyof ContributionExplanationDto>'explanation']
        .setValue(explanation.explanation, { emitEvent: false });
    if (explanation?.manifestUrl)
      this.form.controls[<keyof ContributionExplanationDto>'manifestUrl']
        .setValue(explanation.manifestUrl, { emitEvent: false });
    if (explanation?.video)
      this.form.controls[<keyof ContributionExplanationDto>'video']
        .setValue(explanation.video, { emitEvent: false });
  });

  private autoSaveSub: Subscription = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
    switchMap(clubhouseExplanation => this.saveExplanationService.save$(clubhouseExplanation)),
    tap(saved => this.saved = saved),
  ).subscribe();

  ngOnDestroy(): void {
    this.loadContributionExplanationSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls[<keyof ContributionExplanationDto>'video'].setValue(video);
  }

}
