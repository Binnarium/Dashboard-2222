import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ImageDTO } from 'src/app/shared/upload/asset.dto';
import { CompetenceDto } from '../competence.dto';
import { LoadCompetenceService } from './load-competence.service';
import { SaveCompetenceService } from './save-competence.service';

@Component({
  selector: 'dashboard-update-competence',
  templateUrl: './update-competence.component.html',
  styles: [
  ]
})
export class UpdateCompetenceComponent implements OnDestroy {
  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loadCompetenceService: LoadCompetenceService,
    private readonly saveCompetenceService: SaveCompetenceService,
  ) { }

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group(<Record<keyof CompetenceDto, any>>{
    id: null,
    image: { height: null, name: null, path: null, url: null, width: null, },
    kind: null,
    name: null
  });

  /** current identifier of city page */
  private readonly competence$: Observable<CompetenceDto | null> = this.route.params.pipe(
    map(params => params!.competenceId as string),
    tap(id => console.log('changed' + id)),
    switchMap(competenceId => this.loadCompetenceService.load$(competenceId)),
    shareReplay(),
  );

  private readonly loadCompetenceSub: Subscription = this.competence$.subscribe(
    // every time a new value comes, update the controls
    competence => {
      if (competence)
        this.form.setValue(competence, { emitEvent: false });
    }
  );

  saveSub: Subscription | null = null;
  deleteSub: Subscription | null = null;

  ngOnDestroy(): void {
    this.loadCompetenceSub.unsubscribe();
    this.saveSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
  }

  uploadImage(image: ImageDTO,) {
    this.form.controls['image'].setValue(image);
  }

  save() {
    if (this.saveSub)
      return;

    const currentVal: CompetenceDto = this.form.value;
    const competenceId = this.route.snapshot.params.competenceId as string;

    this.saveSub = this.saveCompetenceService.save$(competenceId, currentVal).subscribe(saved => {
      if (!saved)
        alert('Ocurrió un error al guardar, vuelve a intentarlo')

      this.saveSub?.unsubscribe();
      this.saveSub = null;
    })
  }

  get isSaving(): boolean {
    return !!this.saveSub;
  }

}
