import { Component, OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../../common/session-init-require/session-init-require.component';
import { GamePreviewComponent } from '../game-preview/game-preview.component';
import { GameDataService } from '../../services/session/gameData.service';
import { SessionService } from '../../services/session/session.service';
import { Game } from '../../common/interfaces/game';


@Component({
  selector: 'app-library',
  standalone: true,
  imports: [GamePreviewComponent, SessionInitRequireComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit{

  constructor(){
    this.gameData.currentGameList.subscribe(game => {
      this.games = game;
      this.selectedGame = this.games[0];
    })
  }
  gameData:GameDataService = inject(GameDataService);
  sessionService: SessionService = inject(SessionService);

  public games: Game[] = [];

  public selectedGame: Game = {} as Game;



  ngOnInit(): void {
    if(this.sessionService.getSession()){
      this.gameData.fetchLibrary(this.sessionService.getSession()!.id);
    }
  }

  selectGame(game: Game): void {
    this.selectedGame = game;
    console.table(this.selectedGame);
  }
}
