import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { ImageDTO } from 'src/app/shared/upload/asset.dto';
import { CityMonsterDto } from './city-monster.dto';
import { LoadMonsterService } from './load-monster.service';
import { SaveMonsterService } from './save-monster.service';

@Component({
  selector: 'dashboard-city-monster',
  templateUrl: './city-monster.component.html',
  styles: [
  ]
})
export class CityMonsterComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadMonsterService: LoadMonsterService,
    private readonly saveMonsterService: SaveMonsterService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CityMonsterDto, UntypedFormGroup>>{
    illustration: this.fb.group(<ImageDTO>{
      height: null,
      name: null,
      path: null,
      url: null,
      width: null,
    })
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly monster$: Observable<CityMonsterDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadMonsterService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private monsterFormValue$: Observable<CityMonsterDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.monsterFormValue$])
    .pipe(
      switchMap(([cityId, monster]) => this.saveMonsterService.save$(cityId, monster)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadMonsterSub: Subscription = this.monster$.subscribe(monster => {
    // every time a new value comes, update the controls
    if (!!monster?.illustration)
      this.form.controls[<keyof CityMonsterDto>'illustration'].setValue(monster.illustration, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadMonsterSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadImage(image: NonNullable<ImageDTO>) {
    this.form.controls['illustration'].setValue(image);
  }
}
