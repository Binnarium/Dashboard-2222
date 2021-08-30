import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { ImageDTO } from 'src/app/shared/upload/asset.dto';
import { CityMicroMesoMacro } from './city-micro-meso-macro.dto';
import { LoadMicroMesoMacroService } from './load-micro-meso-macro.service';
import { SaveMicroMesoMacroService } from './save-micro-meso-macro.service';

@Component({
  selector: 'dashboard-city-micro-meso-macro',
  templateUrl: './city-micro-meso-macro.component.html',
})
export class CityMicroMesoMacroComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadMicroMesoMacroService: LoadMicroMesoMacroService,
    private readonly saveMicroMesoMacroService: SaveMicroMesoMacroService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof CityMicroMesoMacro, FormGroup | FormControl>>{
    title: this.fb.control(null),
    subtitle: this.fb.control(null),
    image: this.fb.group(<ImageDTO>{
      height: null,
      width: null,
      name: null,
      path: null,
      url: null,
    })
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly microMesoMacro$: Observable<CityMicroMesoMacro | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadMicroMesoMacroService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private microMesoMacroFormValue$: Observable<CityMicroMesoMacro> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.microMesoMacroFormValue$])
    .pipe(
      switchMap(([cityId, microMesoMacroVideo]) => this.saveMicroMesoMacroService.save$(cityId, microMesoMacroVideo)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadMicroMesoMacroSub: Subscription = this.microMesoMacro$.subscribe(microMesoMacro => {
    // every time a new value comes, update the controls
    if (!!microMesoMacro?.image)
      this.form.controls[<keyof CityMicroMesoMacro>'image'].setValue(microMesoMacro.image, { emitEvent: false });

    if (!!microMesoMacro?.title)
      this.form.controls[<keyof CityMicroMesoMacro>'title'].setValue(microMesoMacro.title, { emitEvent: false });

    if (!!microMesoMacro?.subtitle)
      this.form.controls[<keyof CityMicroMesoMacro>'subtitle'].setValue(microMesoMacro.subtitle, { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadMicroMesoMacroSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  uploadImage(image: NonNullable<ImageDTO>) {
    this.form.controls[<keyof CityMicroMesoMacro>'image'].setValue(image);
  }
}
