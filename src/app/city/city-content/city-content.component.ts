import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { debounce, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { AudioDto, VideoDTO } from 'src/app/shared/upload/asset.dto';
import { AudioContentDto, VideoContentDto } from './city-content.dto';
import { LoadContentService } from './load-content.service';
import { SaveContentService } from './save-content.service';


@Component({
  selector: 'dashboard-city-content',
  templateUrl: './city-content.component.html',
})
export class CityContentComponent implements OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadContentService: LoadContentService,
    private readonly saveContentService: SaveContentService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group({
    content: this.fb.array([]),
  });

  /** Current state of the form if its value have been saved */
  public saved = true;

  /** current identifier of city page */
  private readonly cityId$: Observable<string> = this.route.params.pipe(
    map(params => params!.cityId as string)
  );

  private autoSaveSub: Subscription = combineLatest([this.cityId$, this.form.valueChanges]).pipe(
    tap(() => this.saved = false),
    debounce(() => interval(1000)),
    switchMap(([cityId, content]) => this.saveContentService.save$(cityId, content)),
    tap(saved => this.saved = saved),
  ).subscribe();

  private readonly loadContentSub: Subscription = this.cityId$.pipe(
    switchMap(cityId => this.loadContentService.load$(cityId)),
    take(1),
    shareReplay(),
    // every time a new value comes, update the controls
  ).subscribe(payload => {
    const formElements = payload?.content.map(item => {
      let formContent: VideoContentDto | AudioContentDto | null = null;

      if (item.kind === 'CONTENT#VIDEO') {
        const temp: VideoContentDto = {
          kind: 'CONTENT#VIDEO',
          author: item.author ?? null,
          description: item.description ?? null,
          duration: item.duration ?? null,
          format: item.format ?? null,
          title: item.title ?? null,
          path: item.path ?? null,
          url: item.url ?? null,
          name: item.name ?? null,
        };
        formContent = temp;
      }
      else {
        const temp: AudioContentDto = {
          kind: 'CONTENT#PODCAST',
          author: item.author ?? null,
          description: item.description ?? null,
          duration: item.duration ?? null,
          format: item.format ?? null,
          title: item.title ?? null,
          path: item.path ?? null,
          url: item.url ?? null,
          name: item.name ?? null,
        };
        formContent = temp;
      }
      return this.fb.group(formContent);
    }) ?? [];
    this.form.setControl('content', this.fb.array(formElements), { emitEvent: false });
  });

  ngOnDestroy(): void {
    this.loadContentSub.unsubscribe();
    this.autoSaveSub.unsubscribe();
  }

  get cityContent(): FormArray {
    return this.form.get('content') as FormArray;
  }

  uploadContent(content: NonNullable<VideoDTO | AudioDto>, index: number) {
    const currentValue = this.cityContent.controls[index].value as VideoContentDto | AudioContentDto;
    const newVal = Object.assign(currentValue, { ...content })
    this.cityContent.controls[index].setValue(newVal);
  }

  addPodcast() {
    const voidVideo: AudioContentDto = {
      kind: 'CONTENT#PODCAST',
      author: null,
      description: null,
      duration: null,
      format: null,
      title: null,
      path: null,
      url: null,
      name: null,
    }
    this.cityContent.push(this.fb.group(voidVideo));
  }

  addVideo() {
    const voidVideo: VideoContentDto = {
      kind: 'CONTENT#VIDEO',
      author: null,
      description: null,
      duration: null,
      format: null,
      title: null,
      path: null,
      url: null,
      name: null,
    }
    this.cityContent.push(this.fb.group(voidVideo));
  }

  public getDescriptionControl(index: number): FormControl {
    return ((this.form.controls['content'] as FormArray).at(index) as FormGroup).controls['description'] as FormControl;
  }


  deleteItem(index: number): void {
    this.cityContent.removeAt(index);
  }
}
