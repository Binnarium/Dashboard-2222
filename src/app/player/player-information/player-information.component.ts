import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChatModel, ChatsService } from 'src/app/core/services/chats.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { PlayerModel } from 'src/app/players/player.model';

@Component({
  selector: 'dashboard-player-information',
  templateUrl: './player-information.component.html',
})
export class PlayerInformationComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly playerService: PlayerService,
    private readonly chatsServices: ChatsService,
    private readonly _afFunctions: AngularFireFunctions,
  ) { }

  private _savingSub: Subscription | null = null;

  public readonly player$: Observable<PlayerModel | null> = this.route.params.pipe(
    switchMap(params => this.playerService.getPlayer$(params.playerId)),
  );

  public readonly chat$: Observable<ChatModel | null> = this.player$.pipe(
    switchMap(p => !!p?.groupId ? this.chatsServices.getChat$(p.groupId) : of(null)),
  );

  updatePlayerWebAccess(playerId: string, value: boolean) {
    if (!!this._savingSub)
      return

    this._savingSub = this.playerService.updateWebAccess$(playerId, value).subscribe((saved) => {
      if (!saved)
        alert('Ocurrió un problema al actualizar los datos');

      this._savingSub?.unsubscribe();
      this._savingSub = null;
    });
  }

  connectPubPub(uid: string, name: string) {
    if (!!this._savingSub)
      return

    const profileUrl = prompt(`Ingresa la Url del perfil de ${name}`);

    if (!profileUrl)
      return;

    const fn = this._afFunctions.httpsCallable<{ profileUrl: string, playerUid: string }, { pubsFound: number, pubsWatchersCreated: number, pubsWatchersExisting: number }>('CONTRIBUTIONS_updatePubWatchersFromProfile');

    this._savingSub = fn({ playerUid: uid, profileUrl }).subscribe((res) => {
      alert(`Econtrados: ${res.pubsFound}; Nuevos: ${res.pubsWatchersCreated}; Existentes: ${res.pubsWatchersExisting}`);
    },
      error => console.error(error),
      () => {
        this._savingSub?.unsubscribe();
        this._savingSub = null;
      }
    );
  }

  moveGroup(uid: string, name: string) {
    if (!!this._savingSub)
      return

    const newGroupId = prompt(`Ingresa el id del nuevo grupo de ${name}`);

    if (!newGroupId)
      return;

    const fn = this._afFunctions.httpsCallable<{ newGroupId: string, playerId: string }, void>('CHAT_movePlayerChat');

    this._savingSub = fn({ playerId: uid, newGroupId }).subscribe((_) => {
      alert('Cambio de grupo exitoso')
    },
      error => alert(error),
      () => {
        this._savingSub?.unsubscribe();
        this._savingSub = null;
      }
    );
  }

  recalculateAwards(uid: string) {
    if (!!this._savingSub)
      return


    const fn = this._afFunctions.httpsCallable<{ uid: string }, void>('AWARDS_recalculateAwards');

    this._savingSub = fn({ uid }).subscribe((_) => {
      alert('Calculado!')
    },
      error => alert(error),
      () => {
        this._savingSub?.unsubscribe();
        this._savingSub = null;
      }
    );
  }

  resetPassword(email: string) {
    if (!!this._savingSub)
      return


    const fn = this._afFunctions.httpsCallable<{ email: string }, { link?: string }>('PLAYER_resetPassword');

    this._savingSub = fn({ email }).subscribe(async ({ link }) => {
      if (link) {
        await navigator.clipboard.writeText(link);
        alert('Enlace Copiado!')
      }
      else
        alert('Ocurrió un error')
    },
      error => alert(error),
      () => {
        this._savingSub?.unsubscribe();
        this._savingSub = null;
      }
    );
  }


}
