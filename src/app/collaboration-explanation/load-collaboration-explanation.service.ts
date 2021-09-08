import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CollaborationExplanationDto } from './collaboration-explanation.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadCollaborationExplanationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$: Observable<CollaborationExplanationDto | null> = this.afFirestore.collection('application')
    .doc<CollaborationExplanationDto>('collaboration-explanation')
    .valueChanges()
    .pipe(
      map(data => data ?? null),
      shareReplay(1),
    );
}
