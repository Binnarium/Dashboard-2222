import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { InscriptionModel } from '../models/inscription.model';

@Component({
  selector: 'dashboard-list-inscriptions',
  templateUrl: './list-inscriptions.component.html',
  styles: [
  ]
})
export class ListInscriptionsComponent implements OnInit {

  constructor(
    private readonly _afFirestore: AngularFirestore,
  ) { }

  public readonly inscriptions$: Observable<Array<InscriptionModel>> = this._afFirestore.collection<InscriptionModel>('inscribed-players').valueChanges()
    .pipe(startWith([]));

  ngOnInit(): void {

  }

}
