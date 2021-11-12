
/**
 * Data types used to identify different kinds of players
 */
export const PlayersTypes: Record<string, string> = {
  "PLAYER#2000": "Grupo de los 2000",
  "PLAYER#INVITED": "Invitado",
  "PLAYER#TESTER": "Tester",
} as const;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerType'
})
export class PlayerTypePipe implements PipeTransform {
  transform(value: string): string {
    return PlayersTypes[value] ?? 'Tipo de Jugador invalido';
  }
}
