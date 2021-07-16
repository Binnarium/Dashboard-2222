import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { debounce, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { VideoDTO } from '../shared/upload/asset.dto';
import { LoadWelcomeService } from './load-welcome.service';
import { SaveWelcomeService } from './save-welcome.service';
import { WelcomeDto } from './welcome.dto';

@Component({
  selector: 'dashboard-welcome',
  templateUrl: './welcome.component.html',
  styles: [
  ]
})
export class WelcomeComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly loadWelcomeService: LoadWelcomeService,
    private readonly saveWelcomeService: SaveWelcomeService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof WelcomeDto, FormControl | FormGroup>>{
    profundityText: this.fb.control(null),
    pageTitle: this.fb.control(null),
    largeText: this.fb.control(null),
    welcomeVideo: this.fb.group(<Record<keyof VideoDTO, FormControl>>{
      duration: this.fb.control(null),
      format: this.fb.control(null),
      name: this.fb.control(null),
      path: this.fb.control(null),
      url: this.fb.control(null)
    }),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** load from database */
  private readonly loadInscriptionSub: Subscription = this.loadWelcomeService.load$
    .pipe(
      take(1),
      shareReplay(),
    )
    .subscribe(
      welcome => welcome ? this.form.setValue(welcome, { emitEvent: false }) : null
    );

  private autoSaveSub: Subscription = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
    switchMap(welcome => this.saveWelcomeService.save$(welcome)),
    tap(saved => this.saved = saved),
  ).subscribe();

  ngOnDestroy(): void {
    this.loadInscriptionSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }
  uploadVideo(video: NonNullable<VideoDTO>) {
    this.form.controls['welcomeVideo'].setValue(video);
  }
}
