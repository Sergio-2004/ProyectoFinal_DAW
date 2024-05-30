import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionInitRequireComponent } from '../../common/session-init-require/session-init-require.component';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { GameDataService } from '../../services/session/gameData.service';
import { SessionService } from '../../services/session/session.service';
import { Game } from '../../common/interfaces/game';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [SearchBarComponent, SessionInitRequireComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {


  _route: ActivatedRoute = inject(ActivatedRoute);
  gameDataService:GameDataService = inject(GameDataService);
  sessionService: SessionService = inject(SessionService);
  public games: Game[] = [];
  public game: Game = {} as Game;




  ngOnInit(): void {
    this.gameDataService.fetchGames();
    this.gameDataService.currentGameList.subscribe({
      next: (gameList) => {
        this.games = gameList;
        this.games.forEach(game => {
          if(game.name === this._route.snapshot.params['name']){
            this.game = game;
          }
        });
      }
    })
  }

  downloadGame(){
    const link = document.createElement('a');
    link.href = '/assets/uploads/games/'+this.game!.name.replace(' ', '%20')+'/'+this.game!.name.replace(' ', '%20')+'.zip';
    link.download = this.game!.name+'.zip';
    link.click();
  }

  addToLibrary(game: Game){
    this.gameDataService.addToLibrary(game.id, this.sessionService.getSession()!.id);
  }

  getGameImageUrl(): string {
    return `http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getGameImage.php?game_name=${this.game?.name}`;
  }

}
