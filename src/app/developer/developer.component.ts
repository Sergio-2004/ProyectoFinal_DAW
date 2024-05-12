import { Component,  OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { GameDataService } from '../services/session/gameData.service';
import { Game } from '../interfaces/game';
import { Data } from '../interfaces/data';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [SessionInitRequireComponent],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent implements OnInit{

  constructor( private gameData:GameDataService){
    this.gameData.currentGameList.subscribe(game => {
      this.games = game;
    });
    this.gameData.currentGameDataList.subscribe(data => {
      this.dataList = data;
    });
  }

  sessionService: SessionService = inject(SessionService);

  public games: Game[] = [];

  public selectedGame?: Game;

  public dataList: Data[] = [];

  ngOnInit(): void {
    if(this.sessionService.getSession()){
      this.gameData.fetchDevelopedGames(this.sessionService.getSession()!.id);
    }
  }

  selectGame(game: Game): void {
    this.selectedGame = game;
    this.gameData.fetchGameData(game.id);
    console.log(game.id);
  }
}
