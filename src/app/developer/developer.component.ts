import { Component,  OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { GameDataService } from '../services/session/gameData.service';
import { Game } from '../interfaces/game';
import { DataIndex } from '../interfaces/dataIndex';

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
    this.gameData.currentGameDataIndexList.subscribe(dataIndex => {
      this.dataIndexList = dataIndex;
    });
  }

  sessionService: SessionService = inject(SessionService);

  public games: Game[] = [];

  public selectedGame?: Game;

  public dataIndexList: DataIndex[] = [];

  ngOnInit(): void {
    if(this.sessionService.getSession()){
      this.gameData.fetchDevelopedGames(this.sessionService.getSession()!.id);
    }
  }

  selectGame(game: Game): void {
    this.selectedGame = game;
    this.gameData.fetchGameDataIndex(game.id);
    console.log(game.id);
  }
}
