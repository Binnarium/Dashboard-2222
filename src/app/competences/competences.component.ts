import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateNewCompetenceService } from './create-new-competence.service';
import { LoadAllCompetencesService } from './load-all-competences.service';

@Component({
  selector: 'dashboard-competences',
  templateUrl: './competences.component.html',
})
export class CompetencesComponent implements OnDestroy {

  constructor(
    private readonly loadAllCompetencesService: LoadAllCompetencesService,
    private readonly creaNewCompetenceService: CreateNewCompetenceService,
    private readonly router: Router,
  ) { }

  public readonly competences$ = this.loadAllCompetencesService.load$;

  private createSub: Subscription | null = null;

  ngOnDestroy() {
    this.createSub?.unsubscribe();
  }

  get isCreating(): boolean {
    return !!this.createSub;
  }

  createNew(): void {
    if (this.createSub)
      return;

    this.createSub = this.creaNewCompetenceService.create$().subscribe(competenceId => {
      if (!competenceId) {
        alert('Ocurrió un error al crear la competencia');
        return;
      }

      this.router.navigate(['/competencias', competenceId]);

      this.createSub!.unsubscribe();
      this.createSub = null;
    });
  }

}
