import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InscriptionModel } from './models/inscription.model';

@Injectable({
  providedIn: 'root'
})
export class TransformCsvToInscriptionService {

  public transform$(csv: Array<Array<string>>): Observable<Array<InscriptionModel>> {

    const csvToObjects = csv.map(row => this.transformRowToObject(row));

    return of(csvToObjects);
  }

  protected transformRowToObject(row: Array<string>): InscriptionModel {

    // store in variables
    const [name, lastName, email] = row;

    return <InscriptionModel>{
      email,
      lastName,
      name,
    };
  }
}
