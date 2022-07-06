import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { LoadCitiesService } from 'src/app/core/cities-module/load-cities.service';
import { DocumentDTO } from 'src/app/shared/upload/asset.dto';
import { CreatePlayerProjectModel, PlayerProjectService } from '../player-clubhouse.service';

@Component({
  selector: 'dashboard-upload-project',
  templateUrl: './upload-project.component.html',
})
export class UploadProjectComponent {

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly playerProjectService: PlayerProjectService,
    private readonly loadCitiesService: LoadCitiesService,
  ) { }

  cities$ = this.loadCitiesService.cities$.pipe(
    map(cities => cities.filter(c => c.enabledPages?.project && c.stage !== 12)),
  );

  private taskSub: Subscription | null = null;

  /** form so upload content */
  public readonly form: UntypedFormGroup = this.fb.group(<Record<keyof CreatePlayerProjectModel, UntypedFormGroup | UntypedFormControl>>{
    cityId: this.fb.control(null),
    kind: this.fb.control(null),
    file: this.fb.group(<DocumentDTO>{
      name: null,
      path: null,
      url: null,
    }),
  });

  uploadDocument(document: NonNullable<DocumentDTO>) {
    this.form.controls[<keyof CreatePlayerProjectModel>'file'].setValue(document);
  }

  create() {
    if (!!this.taskSub)
      return;

    const { value: { cityId = null, kind = null, file: { path = null, url = null } } } = this.form;

    if (!cityId || !kind || !path || !url) {
      alert('Formulario Invalido')
      return
    }

    this.taskSub = this.route.params.pipe(
      take(1),
      switchMap(params => this.playerProjectService.createNew$(params.playerId, cityId, kind, path, url)),
    ).subscribe(created => {
      if (created)
        this.router.navigate(['..'], { relativeTo: this.route });
      else
        alert('No se pudo crear el Clubhouse')

      this.taskSub?.unsubscribe();
      this.taskSub = null;
    });
  }
}
