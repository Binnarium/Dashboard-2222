import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { ChatModel, ChatsService } from 'src/app/core/services/chats.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { PlayerModel } from 'src/app/players/player.model';

@Component({
  selector: 'dashboard-player-change-group',
  templateUrl: './player-change-group.component.html',
})
export class PlayerChangeGroupComponent implements OnInit {

  constructor(
    private readonly chatsService: ChatsService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly playerService: PlayerService,
  ) { }

  public readonly player$: Observable<PlayerModel | null> = this.route.params.pipe(
    switchMap(params => this.playerService.getPlayer$(params.playerId)),
    shareReplay(1),
  );

  public readonly chat$: Observable<ChatModel | null> = this.player$.pipe(
    switchMap(p => !!p?.groupId ? this.chatsService.getChat$(p.groupId) : of(null)),
  );

  chats$ = this.chatsService.chatsGroups$;

  /** form so upload content */
  public readonly form: FormGroup = this.fb.group({
    groupId: this.fb.control(null),
  });

  private taskSub: Subscription | null = null;

  get isSaving() {
    return !!this.taskSub;
  }

  ngOnInit(): void {
    this.form.disable();
    const sub = this.player$.subscribe(player => {
      if (!player)
        return;

      this.form.setValue({ groupId: player.groupId ?? null });
      this.form.enable();
      sub.unsubscribe();
    })
  }

  changeGroup() {
    if (!!this.taskSub)
      return;

    const { value: { groupId = null } } = this.form;

    if (!groupId) {
      alert('Formulario Invalido')
      return
    }

    this.taskSub = this.route.params.pipe(
      take(1),
      switchMap(params => this.playerService.moveGroup$(params.playerId, groupId)),
    ).subscribe(success => {
      if (!success)
        alert('No se pudo cambiar de grupo')

      this.taskSub?.unsubscribe();
      this.taskSub = null;
    });
  }

  createGroup() {
    if (!!this.taskSub)
      return;

    const name = prompt(`Ingresa el nombre del grupo sin espacios`)?.replace(' ', '_') ?? null;

    if (name === null || name.length < 5) {
      alert('Ingresa un nombre')
      return
    }

    this.taskSub = this.chatsService.createChat$(name).pipe(
    ).subscribe(name => {
      if (name)
        alert(`Se creo el grupo: ${name}`)
      else
        alert('No se creo el grupo');

      this.taskSub?.unsubscribe();
      this.taskSub = null;
    });
  }
}
