import { Component,  OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../../common/session-init-require/session-init-require.component';
import { SessionService } from '../../services/session/session.service';
import { GameDataService } from '../../services/session/gameData.service';
import { Game } from '../../common/interfaces/game';
import { DataIndex } from '../../common/interfaces/dataIndex';
import { NewParameterComponent } from '../new-parameter/new-parameter.component';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [SessionInitRequireComponent, NewParameterComponent],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent implements OnInit{

  constructor(){
    this.gameDataService.currentGameList.subscribe(game => {
      this.games = game;
    });
    this.gameDataService.currentGameDataIndexList.subscribe(dataIndex => {
      this.dataIndexList = dataIndex;
    });
  }

  private gameDataService:GameDataService = inject(GameDataService);

  sessionService: SessionService = inject(SessionService);

  public games: Game[] = [];

  public selectedGame?: Game;

  public dataIndexList: DataIndex[] = [];

  selectedFile?: File;

  ngOnInit(): void {
    if(this.sessionService.getSession()){
      this.gameDataService.fetchDevelopedGames(this.sessionService.getSession()!.id);
    }
  }

  selectGame(game: Game): void {
    this.selectedGame = game;
    this.gameDataService.fetchGameDataIndex(game.id);
    console.log(game.id);
  }

  deleteParameter(name: string, game_id: number){
    this.gameDataService.deleteParameter(name, game_id);
    window.location.reload();
  }

  deleteGame(game: Game){
    this.gameDataService.deleteGame(game.id, game.name);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateGameFiles(){
    if(this.selectedFile){
      this.gameDataService.uploadGameFile(this.selectedFile, this.selectedGame!.name).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
