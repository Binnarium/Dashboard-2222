import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlayersTypes } from '../shared/data/players-types.data';
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
    const [name, lastName, email, playerType] = row;

    const playersTypes: Array<string> = Object.keys(PlayersTypes);

    if (!playersTypes.includes(playerType)) {
      alert('Tipo de jugador invalido');
      throw new Error("invalid player type");
    }

    return <InscriptionModel>{
      email,
      lastName,
      name,
      playerType
    };
  }
}
