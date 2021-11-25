import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { InscriptionModel } from '../models/inscription.model';

@Injectable({
  providedIn: 'root'
})
export class UploadInscriptionsService {

  constructor(
    protected readonly db: AngularFirestore,
  ) { }

  public upload$(data: Array<InscriptionModel>): Observable<boolean> {
    const batch = this.db.firestore.batch();

    data.forEach(inscription => {
      // references to all the documents that will be updated when a new mentor is created
      const inscriptionRef = this.db.collection('inscribed-players').doc(inscription.email).ref;
      batch.set(inscriptionRef, inscription, { merge: true });
    });

    // batch writes
    return from(batch.commit()).pipe(
      mapTo(true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
