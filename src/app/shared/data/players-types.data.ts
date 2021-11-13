import { Pipe, PipeTransform } from '@angular/core';

/**
 * Data types used to identify different kinds of players
 */
const PlayersTypesMap: Record<string, string> = {
  "PLAYER#TESTER": "Tester",
  "PLAYER#2000": "Grupo de los 2000",
  "PLAYER#INVITED": "Invitado",
};

export const PlayersTypes: Array<string> = Object.keys(PlayersTypesMap);


@Pipe({
  name: 'playerTypePipe'
})
export class PlayerTypePipe implements PipeTransform {
  transform(value: string): string {
    return PlayersTypesMap[value] ?? 'Tipo de Jugador invalido';
  }
}
