import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../interfaces/game';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { GameDataService } from '../services/session/gameData.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [SearchBarComponent, SessionInitRequireComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private gameData:GameDataService) {}

  sessionService: SessionService = inject(SessionService);
  public games: Game[] = [];
  public game: Game = {} as Game;




  ngOnInit(): void {
    this.gameData.fetchGames();
    this.gameData.currentGameList.subscribe({
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

}
