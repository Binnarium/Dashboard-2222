import { Component, OnDestroy } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { ImageDTO } from 'src/app/shared/upload/asset.dto';
import { CityResourcesDto, ExternalLinkDto, ReadingDto } from './city-resources.dto';
import { LoadResourcesService } from './load-resources.service';
import { SaveResourcesService } from './save-resources.service';

@Component({
  selector: 'dashboard-city-resources',
  templateUrl: './city-resources.component.html',
  styles: [
  ]
})
export class CityResourcesComponent implements OnDestroy {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadResourcesService: LoadResourcesService,
    private readonly saveResourcesService: SaveResourcesService,
  ) { }

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CityResourcesDto, UntypedFormArray>>{
    externalLinks: this.fb.array([]),
    readings: this.fb.array([]),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params.cityId as string)
  );

  /** load from database */
  private readonly resources$: Observable<CityResourcesDto | null> = this.cityId$.pipe(
    switchMap(cityId => this.loadResourcesService.load$(cityId)),
    take(1),
    shareReplay(),
  );

  private resourcesForm$: Observable<CityResourcesDto> = this.form.valueChanges.pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.resourcesForm$])
    .pipe(
      switchMap(([cityId, argument]) => this.saveResourcesService.save$(cityId, argument)),
      tap(saved => this.saved = saved),
    ).subscribe();

  private readonly loadResourcesSub: Subscription = this.resources$.pipe(
    take(1),
  ).subscribe(resources => {
    resources?.readings?.forEach(reading => {
      const readingGroup = this.createReadingGroup(reading);
      this.readingsFormArray.push(readingGroup, { emitEvent: false })
    });
    resources?.externalLinks?.forEach(link => {
      const readingGroup = this.createLinkGroup(link);
      this.externalLinksFormArray.push(readingGroup, { emitEvent: false })
    });
  });

  ngOnDestroy(): void {
    this.loadResourcesSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  get readingsFormArray(): UntypedFormArray {
    return this.form.controls[<keyof CityResourcesDto>'readings'] as UntypedFormArray;
  }


  addReading(): void {
    const newReading = this.createReadingGroup();
    this.readingsFormArray.push(newReading);
  }

  removeReading(index: number): void {
    this.readingsFormArray.removeAt(index)
  }

  get externalLinksFormArray(): UntypedFormArray {
    return this.form.controls[<keyof CityResourcesDto>'externalLinks'] as UntypedFormArray;
  }


  addExternalLink(): void {
    this.externalLinksFormArray.push(this.createLinkGroup());
  }

  removeExternalLink(index: number): void {
    this.externalLinksFormArray.removeAt(index);
  }

  private createReadingGroup(reading?: ReadingDto): UntypedFormGroup {
    return this.fb.group(<Record<keyof ReadingDto, UntypedFormControl | UntypedFormGroup>>{
      name: this.fb.control(reading?.name),
      author: this.fb.control(reading?.author),
      about: this.fb.control(reading?.about),
      link: this.fb.control(reading?.link),
      publishedYear: this.fb.control(reading?.publishedYear),
      cover: this.fb.group(<Record<keyof ImageDTO, UntypedFormControl>>{
        height: this.fb.control(reading?.cover?.height),
        name: this.fb.control(reading?.cover?.name),
        path: this.fb.control(reading?.cover?.path),
        url: this.fb.control(reading?.cover?.url),
        width: this.fb.control(reading?.cover?.width),
      }),
    });
  }

  private createLinkGroup(link?: ExternalLinkDto): UntypedFormGroup {
    return this.fb.group(<Record<keyof ExternalLinkDto, UntypedFormControl | UntypedFormGroup>>{
      title: this.fb.control(link?.title),
      description: this.fb.control(link?.description),
      link: this.fb.control(link?.link),
      kind: this.fb.control(link?.kind ?? <'LINK#OTHER'>'LINK#OTHER'),
    });
  }

  uploadCover(image: ImageDTO, index: number) {
    (this.readingsFormArray.controls[index] as UntypedFormGroup).controls[<keyof ReadingDto>'cover'].setValue(image);
  }

  public getAboutControl(index: number): UntypedFormControl {
    return ((this.form.controls[<keyof CityResourcesDto>'readings'] as UntypedFormArray)
      .at(index) as UntypedFormGroup)
      .controls[<keyof ReadingDto>'about'] as UntypedFormControl;
  }
  public getLinkDescriptionControl(index: number): UntypedFormControl {
    return ((this.form.controls[<keyof CityResourcesDto>'externalLinks'] as UntypedFormArray)
      .at(index) as UntypedFormGroup)
      .controls[<keyof ExternalLinkDto>'description'] as UntypedFormControl;
  }
}
