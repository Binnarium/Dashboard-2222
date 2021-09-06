import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { debounce, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from '../shared/upload/asset.dto';
import { ClubhouseExplanationDto } from './clubhouse-explanation.dto';
import { LoadClubhouseExplanationService } from './load-clubhouse-explanation.service';
import { SaveClubhouseExplanationService } from './save-clubhouse-explanation.service';

@Component({
  selector: 'dashboard-clubhouse-explanation',
  templateUrl: './clubhouse-explanation.component.html',
})
export class ClubhouseExplanationComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly loadExplanationService: LoadClubhouseExplanationService,
    private readonly saveExplanationService: SaveClubhouseExplanationService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof ClubhouseExplanationDto, FormControl | FormGroup>>{
    explanation: this.fb.control(null),
    clubUrl: this.fb.control(null),
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
  private readonly loadClubhouseExplanationSub: Subscription = this.loadExplanationService.load$.pipe(
    take(1),
    shareReplay(),
  ).subscribe(clubhouseExplanation => {
    if (clubhouseExplanation?.explanation)
      this.form.controls[<keyof ClubhouseExplanationDto>'explanation']
        .setValue(clubhouseExplanation.explanation, { emitEvent: false });
    if (clubhouseExplanation?.clubUrl)
      this.form.controls[<keyof ClubhouseExplanationDto>'clubUrl']
        .setValue(clubhouseExplanation.clubUrl, { emitEvent: false });
    if (clubhouseExplanation?.video)
      this.form.controls[<keyof ClubhouseExplanationDto>'video']
        .setValue(clubhouseExplanation.video, { emitEvent: false });
  });

  private autoSaveSub: Subscription = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
    switchMap(clubhouseExplanation => this.saveExplanationService.save$(clubhouseExplanation)),
    tap(saved => this.saved = saved),
  ).subscribe();

  ngOnDestroy(): void {
    this.loadClubhouseExplanationSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls[<keyof ClubhouseExplanationDto>'video'].setValue(video);
  }

}
