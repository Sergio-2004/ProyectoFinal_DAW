import { Component,  OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { GameDataService } from '../services/session/gameData.service';
import { Game } from '../interfaces/game';

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
      this.selectedGame = this.games[0];
    })
  }

  sessionService: SessionService = inject(SessionService);

  public games: Game[] = [];

  public selectedGame: Game = {} as Game;

  dataList= {
    gameName: 'Time Bandit',
    parameters: [
      {
        name: 'playtime',
        data: 20.42,
        dataCount: 200
      },
      {
        name: 'gotSuperSword',
        data: 100,
        dataCount: 200
      },
      {
        name: 'timesDeath',
        data: 857,
        dataCount: 200
      },
    ]
  }

  ngOnInit(): void {
    if(this.sessionService.getSession()){
      this.gameData.fetchDevelopedGames(this.sessionService.getSession()!.id);
    }
  }
}
