import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StringToCsvParserService {

  public parse$(content: string): Observable<Array<Array<string>>> {
    const data = content
      .split(/\r\n|\n/)
      .filter(line => line.trim() !== '')
      .map(line => (line.split(/,|;/g) as unknown as Array<string>));

    return of(data);
  }
}
