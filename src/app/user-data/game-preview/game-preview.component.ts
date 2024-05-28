import { Component, Input, inject } from '@angular/core';
import { Game } from '../../common/interfaces/game';
import { GameDataService } from '../../services/session/gameData.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-game-preview',
  standalone: true,
  imports: [],
  templateUrl: './game-preview.component.html',
  styleUrl: './game-preview.component.css'
})
export class GamePreviewComponent {
  @Input() game?: Game;

  gameDataService: GameDataService = inject(GameDataService);
  sessionService: SessionService = inject(SessionService);

  downloadGame(){
    const link = document.createElement('a');
    link.href = '/assets/uploads/games/'+this.game!.name.replace(' ', '%20')+'/'+this.game!.name.replace(' ', '%20')+'.zip';
    link.download = this.game!.name+'.zip';
    link.click();
    console.log('/assets/uploads/games/'+this.game!.name.replace(' ', '%20')+'/'+this.game!.name.replace(' ', '%20')+'.zip');
  }
  removeFromLibrary(){
    console.table(this.game);
    this.gameDataService.removeFromLibrary(this.game!.id, this.sessionService.getSession()!.id);
    window.location.reload();
  }
}
