import { NgModule } from '@angular/core';
import { ChatsService } from './chats.service';

import { PlayerService } from './player.service';

@NgModule({
    providers: [
        PlayerService,
        ChatsService,
    ],
})
export class ServicesModule { }
