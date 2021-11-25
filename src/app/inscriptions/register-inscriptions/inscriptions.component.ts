import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { StringToCsvParserService } from './string-to-csv-parser.service';
import { TransformCsvToInscriptionService } from './transform-csv-to-inscription.service';
import { UploadInscriptionsService } from './upload-inscriptions.service';

@Component({
  selector: 'dashboard-inscriptions',
  templateUrl: './inscriptions.component.html',
  providers: [
    TransformCsvToInscriptionService,
    UploadInscriptionsService,
    StringToCsvParserService,
  ]
})
export class InscriptionsComponent implements OnDestroy {
  constructor(
    private readonly stringToCsvParserService: StringToCsvParserService,
    private readonly transformerService: TransformCsvToInscriptionService,
    private readonly uploadService: UploadInscriptionsService,
  ) { }
  isSaving = false;
  private uploadSub: Subscription | null = null;

  private readonly inscriptionsSource$: Subject<string> = new Subject();

  public readonly inscriptions$ = this.inscriptionsSource$.asObservable().pipe(
    switchMap(rawString => this.stringToCsvParserService.parse$(rawString)),
    map(inscriptions => inscriptions.splice(1)),
    switchMap(csv => this.transformerService.transform$(csv)),
    shareReplay(1),
  );

  ngOnDestroy(): void {
    this.uploadSub?.unsubscribe();
  }

  save(): void {
    if (this.uploadSub) {
      alert('Espere un momento');
      return;
    }

    const saveTask = this.inscriptions$.pipe(
      take(1),
      switchMap(inscriptions => this.uploadService.upload$(inscriptions))
    );

    this.uploadSub = saveTask.subscribe(saved => {
      if (saved) {
        alert('Inscripciones guardadas.');
        this.inscriptionsSource$.next('');
      }
      else
        alert('Ocurrió un error al guardar las inscripciones, vuelve a intentarlo.');

      this.uploadSub?.unsubscribe();
      this.uploadSub = null;
    });
  }

  readFile(csv: string): void {
    this.inscriptionsSource$.next(csv);
  }
}
