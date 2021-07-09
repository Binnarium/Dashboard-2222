import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CompetenceDto } from '../competence.dto';
import { LoadAllCompetencesService } from '../load-all-competences.service';

@Injectable({
  providedIn: 'root'
})
export class LoadCompetenceService {
  constructor(
    private readonly loadAllCompetences: LoadAllCompetencesService,
  ) { }

  public load$(competenceId: string): Observable<CompetenceDto | null> {
    return this.loadAllCompetences.load$.pipe(
      map(all => all.find(c => c.id === competenceId) ?? null),
      shareReplay(1),
    );
  }
}
